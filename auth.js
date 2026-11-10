/**
 * Flaggen-Raten.de - Accounts (Login, Registrieren, Profil)
 * Nutzt Supabase (lib/supabase.js) und die Zugangsdaten aus supabase-config.js.
 */
(function () {
    const cfg = window.SUPABASE_CONFIG || {};
    const isConfigured = Boolean(
        cfg.url && cfg.anonKey &&
        !cfg.url.includes('DEIN-PROJEKT') && !cfg.anonKey.includes('DEIN')
    );

    let sb = null;
    if (isConfigured && window.supabase) {
        sb = window.supabase.createClient(cfg.url, cfg.anonKey, {
            auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'pkce' }
        });
    }

    const NAME_REGEX = /^[A-Za-z0-9ÄÖÜäöüß_ -]{3,20}$/;

    const state = {
        user: null,
        profile: null,
        pendingEmail: '',
        pendingName: '',
        inRecovery: false   // gerade im "Passwort vergessen"-Ablauf
    };

    // ---------- Hilfsfunktionen ----------
    const $ = (id) => document.getElementById(id);

    function showMessage(text, type = 'error') {
        const box = $('auth-message');
        if (!box) return;
        box.textContent = text;
        box.className = `auth-message ${type}`;
        box.style.display = text ? 'block' : 'none';
    }

    function clearMessage() {
        showMessage('');
    }

    function setBusy(form, busy) {
        if (!form) return;
        form.querySelectorAll('button, input').forEach(el => { el.disabled = busy; });
        form.classList.toggle('is-busy', busy);
    }

    function cleanName(name) {
        return (name || '').trim().replace(/\s+/g, ' ');
    }

    // Gleiche Liste wie in supabase-rangliste.sql (dort wird endgültig geprüft)
    const VERBOTEN = [
        'fick', 'fotze', 'hurensohn', 'hure', 'wichser', 'wixer', 'wixxer', 'schlampe', 'nutte',
        'arschloch', 'missgeburt', 'spast', 'mongo', 'schwuchtel', 'kanake', 'kinderficker',
        'pimmel', 'muschi', 'titten', 'scheisse', 'scheiße', 'drecksau', 'bastard', 'opfer',
        'fuck', 'shit', 'bitch', 'cunt', 'pussy', 'whore', 'slut', 'faggot', 'retard',
        'penis', 'vagina', 'porn', 'dildo', 'killyourself',
        'nigger', 'nigga', 'neger', 'hitler', 'nazi', 'siegheil', 'heilhitler', 'holocaust', 'kkk',
        'admin', 'moderator', 'support', 'flaggenraten', 'supabase'
    ];

    function nameIsAllowed(name) {
        const ersatz = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b' };
        const norm = name.toLowerCase().replace(/[\s_-]/g, '').replace(/[0134578]/g, c => ersatz[c]);
        return !VERBOTEN.some(wort => norm.includes(wort));
    }

    function checkName(name) {
        if (!NAME_REGEX.test(name)) {
            return 'Der Anzeigename muss 3–20 Zeichen lang sein und darf nur Buchstaben, Zahlen, Leerzeichen, _ und - enthalten.';
        }
        if (!nameIsAllowed(name)) {
            return 'Dieser Anzeigename ist nicht erlaubt. Bitte wähle einen anderen.';
        }
        return '';
    }

    // Übersetzt typische Fehlermeldungen von Supabase ins Deutsche
    function translateError(error) {
        const msg = (error && (error.message || error.error_description || String(error))) || '';
        const m = msg.toLowerCase();
        if (m.includes('invalid login credentials')) return 'E-Mail oder Passwort ist falsch.';
        if (m.includes('email not confirmed')) return 'Deine E-Mail ist noch nicht bestätigt.';
        if (m.includes('user already registered')) return 'Diese E-Mail ist bereits registriert. Melde dich stattdessen an.';
        if (m.includes('should be different')) return 'Das neue Passwort muss sich vom alten unterscheiden.';
        if (m.includes('password should be') || m.includes('weak password')) return 'Das Passwort ist zu schwach. Nimm mindestens 8 Zeichen.';
        if (m.includes('token has expired') || m.includes('otp') || m.includes('invalid token')) return 'Der Code ist falsch oder abgelaufen.';
        if (m.includes('rate limit') || m.includes('for security purposes') || m.includes('too many')) return 'Zu viele Versuche. Bitte warte kurz und versuche es dann erneut.';
        if (m.includes('unable to validate email') || m.includes('invalid email')) return 'Bitte gib eine gültige E-Mail-Adresse ein.';
        if (m.includes('failed to fetch') || m.includes('network')) return 'Keine Verbindung zum Server. Bist du online?';
        if (error && error.code === '23505') return 'Dieser Anzeigename ist schon vergeben.';
        if (error && error.code === '23514') return 'Dieser Anzeigename ist nicht erlaubt.';
        return msg || 'Etwas ist schiefgelaufen. Bitte versuche es erneut.';
    }

    function siteUrl() {
        return window.location.origin + window.location.pathname;
    }

    // ---------- Panels im Login-Fenster ----------
    const PANELS = ['login', 'register', 'verify', 'reset-request', 'reset-verify', 'reset-password', 'name'];

    function showPanel(name) {
        PANELS.forEach(p => {
            const el = $(`auth-panel-${p}`);
            if (el) el.style.display = p === name ? 'block' : 'none';
        });

        const tabs = $('auth-tabs');
        if (tabs) tabs.style.display = (name === 'login' || name === 'register') ? 'flex' : 'none';
        document.querySelectorAll('.auth-tab').forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-auth-tab') === name);
        });

        const titles = {
            login: 'Anmelden',
            register: 'Registrieren',
            verify: 'E-Mail bestätigen',
            'reset-request': 'Passwort vergessen',
            'reset-verify': 'Code eingeben',
            'reset-password': 'Neues Passwort',
            name: 'Anzeigename wählen'
        };
        const title = $('auth-title');
        if (title) title.textContent = titles[name] || 'Account';

        const closeBtn = $('auth-close-btn');
        if (closeBtn) closeBtn.style.display = name === 'name' ? 'none' : '';

        clearMessage();
    }

    function openAuth(panel = 'login', infoText = '') {
        showPanel(panel);
        if (infoText) showMessage(infoText, 'info');
        if (typeof openModal === 'function') openModal('modal-auth');
        const notice = $('auth-config-notice');
        if (notice) notice.style.display = isConfigured ? 'none' : 'block';
    }

    // ---------- Navigation oben ----------
    function updateNavUI() {
        const loginBtn = $('btn-open-login');
        const profileBtn = $('btn-open-profile');
        const loggedIn = Boolean(state.user);

        if (loginBtn) loginBtn.style.display = loggedIn ? 'none' : '';
        if (profileBtn) profileBtn.style.display = loggedIn ? '' : 'none';

        const name = state.profile ? state.profile.display_name : '';
        const avatar = $('nav-profile-avatar');
        if (avatar) avatar.textContent = (name || '?').charAt(0).toUpperCase();
        const navName = $('nav-profile-name');
        if (navName) navName.textContent = name || 'Profil';

        // Andere Teile der Seite (z. B. die Rangliste) informieren
        document.dispatchEvent(new CustomEvent('flaggen-auth-changed'));
    }

    function updateProfileModal() {
        const name = state.profile ? state.profile.display_name : '';
        const set = (id, text) => { const el = $(id); if (el) el.textContent = text; };

        set('profile-avatar-big', (name || '?').charAt(0).toUpperCase());
        set('profile-display-name', name || '—');
        set('profile-email', state.user ? state.user.email : '');

        const provider = state.user && state.user.app_metadata ? state.user.app_metadata.provider : '';
        set('profile-provider', provider === 'google' ? 'Angemeldet mit Google' : 'Angemeldet mit E-Mail');

        const input = $('profile-name-input');
        if (input) input.value = name;

        const created = state.user && state.user.created_at ? new Date(state.user.created_at) : null;
        set('profile-since', created ? `Dabei seit ${created.toLocaleDateString('de-DE')}` : '');

        const confirmBox = $('profile-delete-confirm');
        if (confirmBox) confirmBox.style.display = 'none';
        const profileMsg = $('profile-message');
        if (profileMsg) profileMsg.style.display = 'none';
    }

    function showProfileMessage(text, type = 'error') {
        const box = $('profile-message');
        if (!box) return;
        box.textContent = text;
        box.className = `auth-message ${type}`;
        box.style.display = text ? 'block' : 'none';
    }

    // ---------- Profil (Anzeigename) ----------
    async function loadProfile() {
        if (!sb || !state.user) return null;
        const { data, error } = await sb
            .from('profiles')
            .select('display_name')
            .eq('id', state.user.id)
            .maybeSingle();
        if (error) {
            console.warn('Profil konnte nicht geladen werden', error);
            return null;
        }
        state.profile = data;
        return data;
    }

    async function isNameAvailable(name) {
        const { data, error } = await sb.rpc('is_display_name_available', { name });
        if (error) throw error;
        return data === true;
    }

    async function createProfile(name) {
        const { error } = await sb.from('profiles').insert({ id: state.user.id, display_name: name });
        if (error) throw error;
        state.profile = { display_name: name };
    }

    // Nach jedem Login: Profil laden, sonst anlegen bzw. nach Namen fragen
    async function afterLogin() {
        await loadProfile();

        // Während "Passwort vergessen" das Fenster offen lassen
        if (state.inRecovery) {
            updateNavUI();
            return;
        }

        if (!state.profile) {
            const wanted = cleanName(state.user.user_metadata && state.user.user_metadata.display_name);
            if (wanted && !checkName(wanted)) {
                try {
                    await createProfile(wanted);
                } catch (e) {
                    // Name inzwischen vergeben -> unten nach neuem Namen fragen
                }
            }
        }

        updateNavUI();

        if (!state.profile) {
            // Bewusst KEIN Vorschlag aus dem Google-Konto (echter Name soll nicht öffentlich werden)
            openAuth('name');
            const input = $('auth-name-input');
            if (input) {
                input.value = '';
                setTimeout(() => input.focus(), 50);
            }
        } else if (document.getElementById('modal-auth').classList.contains('active')) {
            if (typeof closeAllModals === 'function') closeAllModals();
        }
    }

    // ---------- Formulare ----------
    function requireConfig() {
        if (!sb) {
            showMessage('Der Login ist noch nicht eingerichtet. Trage zuerst deine Supabase-Daten in supabase-config.js ein.');
            return false;
        }
        return true;
    }

    async function handleLogin(e) {
        e.preventDefault();
        if (!requireConfig()) return;
        const form = e.target;
        const email = $('login-email').value.trim();
        const password = $('login-password').value;

        setBusy(form, true);
        clearMessage();
        const { error } = await sb.auth.signInWithPassword({ email, password });
        setBusy(form, false);

        if (error) {
            if ((error.message || '').toLowerCase().includes('email not confirmed')) {
                state.pendingEmail = email;
                await sb.auth.resend({ type: 'signup', email });
                showPanel('verify');
                $('verify-email-text').textContent = email;
                showMessage('Deine E-Mail ist noch nicht bestätigt. Wir haben dir einen neuen Code geschickt.', 'info');
                return;
            }
            showMessage(translateError(error));
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        if (!requireConfig()) return;
        const form = e.target;
        const name = cleanName($('register-name').value);
        const email = $('register-email').value.trim();
        const password = $('register-password').value;
        const accepted = $('register-privacy').checked;

        const nameError = checkName(name);
        if (nameError) return showMessage(nameError);
        if (password.length < 8) return showMessage('Das Passwort muss mindestens 8 Zeichen lang sein.');
        if (!accepted) return showMessage('Bitte bestätige, dass du die Datenschutzerklärung gelesen hast.');

        setBusy(form, true);
        clearMessage();
        try {
            if (!(await isNameAvailable(name))) {
                setBusy(form, false);
                return showMessage('Dieser Anzeigename ist schon vergeben.');
            }

            const { data, error } = await sb.auth.signUp({
                email,
                password,
                options: { data: { display_name: name }, emailRedirectTo: siteUrl() }
            });
            if (error) throw error;

            // Supabase verrät aus Sicherheitsgründen nicht direkt, ob die E-Mail schon existiert
            if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
                setBusy(form, false);
                return showMessage('Diese E-Mail ist bereits registriert. Melde dich stattdessen an.');
            }

            state.pendingEmail = email;
            state.pendingName = name;
            setBusy(form, false);

            if (data.session) return; // E-Mail-Bestätigung ist ausgeschaltet -> direkt eingeloggt

            showPanel('verify');
            $('verify-email-text').textContent = email;
            showMessage('Fast geschafft! Wir haben dir einen Bestätigungscode geschickt.', 'success');
        } catch (err) {
            setBusy(form, false);
            showMessage(translateError(err));
        }
    }

    async function handleVerify(e) {
        e.preventDefault();
        if (!requireConfig()) return;
        const form = e.target;
        const token = $('verify-code').value.replace(/\s/g, '');
        if (!/^\d{6,10}$/.test(token)) return showMessage('Bitte gib den Code aus der E-Mail ein.');

        setBusy(form, true);
        const { error } = await sb.auth.verifyOtp({ email: state.pendingEmail, token, type: 'email' });
        setBusy(form, false);
        if (error) return showMessage(translateError(error));
        showMessage('E-Mail bestätigt! Du bist jetzt angemeldet.', 'success');
    }

    async function handleResend() {
        if (!requireConfig() || !state.pendingEmail) return;
        const { error } = await sb.auth.resend({ type: 'signup', email: state.pendingEmail });
        showMessage(error ? translateError(error) : 'Neuer Code wurde verschickt.', error ? 'error' : 'success');
    }

    async function handleResetRequest(e) {
        e.preventDefault();
        if (!requireConfig()) return;
        const form = e.target;
        const email = $('reset-email').value.trim();

        setBusy(form, true);
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: siteUrl() });
        setBusy(form, false);
        if (error) return showMessage(translateError(error));

        state.pendingEmail = email;
        showPanel('reset-verify');
        showMessage('Falls ein Account mit dieser E-Mail existiert, haben wir dir einen Code geschickt.', 'info');
    }

    // Schritt 2: nur den Code prüfen
    async function handleResetVerify(e) {
        e.preventDefault();
        if (!requireConfig()) return;
        const form = e.target;
        const token = $('reset-code').value.replace(/\s/g, '');
        if (!/^\d{6,10}$/.test(token)) return showMessage('Bitte gib den Code aus der E-Mail ein.');

        setBusy(form, true);
        state.inRecovery = true;
        const { error } = await sb.auth.verifyOtp({ email: state.pendingEmail, token, type: 'recovery' });
        setBusy(form, false);
        if (error) {
            state.inRecovery = false;
            return showMessage(translateError(error));
        }
        showPanel('reset-password');
        showMessage('Code bestätigt! Wähle jetzt ein neues Passwort.', 'success');
        setTimeout(() => { const i = $('reset-password'); if (i) i.focus(); }, 50);
    }

    // Schritt 3: neues Passwort speichern
    async function handleResetPassword(e) {
        e.preventDefault();
        if (!requireConfig()) return;
        const form = e.target;
        const password = $('reset-password').value;
        const password2 = $('reset-password-2').value;
        if (password.length < 8) return showMessage('Das neue Passwort muss mindestens 8 Zeichen lang sein.');
        if (password !== password2) return showMessage('Die beiden Passwörter stimmen nicht überein.');

        setBusy(form, true);
        const { error } = await sb.auth.updateUser({ password });
        setBusy(form, false);
        if (error) return showMessage(translateError(error));

        state.inRecovery = false;
        form.reset();
        showMessage('✓ Passwort geändert! Du bist jetzt angemeldet.', 'success');
        setTimeout(() => { afterLogin(); if (state.profile && typeof closeAllModals === 'function') closeAllModals(); }, 1500);
    }

    async function handleChooseName(e) {
        e.preventDefault();
        if (!requireConfig() || !state.user) return;
        const form = e.target;
        const name = cleanName($('auth-name-input').value);
        const nameError = checkName(name);
        if (nameError) return showMessage(nameError);

        setBusy(form, true);
        try {
            if (!(await isNameAvailable(name))) {
                setBusy(form, false);
                return showMessage('Dieser Anzeigename ist schon vergeben.');
            }
            await createProfile(name);
            setBusy(form, false);
            updateNavUI();
            if (typeof closeAllModals === 'function') closeAllModals();
        } catch (err) {
            setBusy(form, false);
            showMessage(translateError(err));
        }
    }

    async function handleGoogle() {
        if (!requireConfig()) return;
        if (window.location.protocol === 'file:') {
            return showMessage('Google-Login funktioniert nur, wenn die Seite online ist oder über einen lokalen Server (z. B. Live Server in VS Code) läuft.');
        }
        const { error } = await sb.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: siteUrl() }
        });
        if (error) showMessage(translateError(error));
    }

    // ---------- Profil-Menü ----------
    async function handleChangeName(e) {
        e.preventDefault();
        if (!sb || !state.user) return;
        const form = e.target;
        const name = cleanName($('profile-name-input').value);
        const nameError = checkName(name);
        if (nameError) return showProfileMessage(nameError);
        if (state.profile && name === state.profile.display_name) return showProfileMessage('Das ist bereits dein Anzeigename.', 'info');

        setBusy(form, true);
        try {
            if (!state.profile || name.toLowerCase() !== state.profile.display_name.toLowerCase()) {
                if (!(await isNameAvailable(name))) {
                    setBusy(form, false);
                    return showProfileMessage('Dieser Anzeigename ist schon vergeben.');
                }
            }
            const { error } = await sb.from('profiles').update({ display_name: name }).eq('id', state.user.id);
            if (error) throw error;
            state.profile = { display_name: name };
            setBusy(form, false);
            updateNavUI();
            updateProfileModal();
            showProfileMessage('Anzeigename gespeichert.', 'success');
        } catch (err) {
            setBusy(form, false);
            showProfileMessage(translateError(err));
        }
    }

    async function handleLogout() {
        if (!sb) return;
        await sb.auth.signOut();
        if (typeof closeAllModals === 'function') closeAllModals();
    }

    async function handleDeleteAccount() {
        if (!sb || !state.user) return;
        const btn = $('btn-profile-delete-final');
        if (btn) btn.disabled = true;
        const { error } = await sb.rpc('delete_own_account');
        if (btn) btn.disabled = false;
        if (error) return showProfileMessage(translateError(error));

        await sb.auth.signOut({ scope: 'local' });
        state.user = null;
        state.profile = null;
        updateNavUI();
        if (typeof closeAllModals === 'function') closeAllModals();
        alertSoft('Dein Account wurde gelöscht.');
    }

    // Kleiner Hinweis unten am Bildschirm statt alert()
    function alertSoft(text) {
        const toast = document.createElement('div');
        toast.className = 'auth-toast';
        toast.textContent = text;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('visible'), 10);
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    // ---------- Start ----------
    function setupListeners() {
        const on = (id, ev, fn) => { const el = $(id); if (el) el.addEventListener(ev, fn); };

        on('btn-open-login', 'click', () => openAuth('login'));
        on('btn-open-profile', 'click', () => {
            updateProfileModal();
            if (typeof openModal === 'function') openModal('modal-profil');
        });

        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => showPanel(tab.getAttribute('data-auth-tab')));
        });
        document.querySelectorAll('[data-auth-goto]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showPanel(link.getAttribute('data-auth-goto'));
            });
        });
        document.querySelectorAll('.btn-google').forEach(btn => btn.addEventListener('click', handleGoogle));

        on('form-login', 'submit', handleLogin);
        on('form-register', 'submit', handleRegister);
        on('form-verify', 'submit', handleVerify);
        on('btn-resend-code', 'click', handleResend);
        on('form-reset-request', 'submit', handleResetRequest);
        on('form-reset-verify', 'submit', handleResetVerify);
        on('form-reset-password', 'submit', handleResetPassword);
        on('form-choose-name', 'submit', handleChooseName);
        on('link-open-privacy', 'click', (e) => {
            e.preventDefault();
            if (typeof openModal === 'function') openModal('modal-datenschutz');
        });

        on('form-profile-name', 'submit', handleChangeName);
        on('btn-profile-logout', 'click', handleLogout);
        on('btn-profile-delete', 'click', () => {
            const box = $('profile-delete-confirm');
            if (box) box.style.display = 'block';
        });
        on('btn-profile-delete-cancel', 'click', () => {
            const box = $('profile-delete-confirm');
            if (box) box.style.display = 'none';
        });
        on('btn-profile-delete-final', 'click', handleDeleteAccount);
    }

    // Auge zum Anzeigen/Verstecken des Passworts
    const EYE_OPEN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
    const EYE_CLOSED = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18"/><path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6C3.9 8.4 2 12 2 12s3.6 7 10 7a10.6 10.6 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';

    function setupPasswordToggles() {
        document.querySelectorAll('input[type="password"]').forEach(input => {
            if (input.parentElement.classList.contains('pw-wrap')) return;
            const wrap = document.createElement('div');
            wrap.className = 'pw-wrap';
            input.parentNode.insertBefore(wrap, input);
            wrap.appendChild(input);

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'pw-toggle';
            btn.setAttribute('aria-label', 'Passwort anzeigen');
            btn.title = 'Passwort anzeigen';
            btn.innerHTML = EYE_OPEN;
            btn.addEventListener('click', () => {
                const show = input.type === 'password';
                input.type = show ? 'text' : 'password';
                btn.innerHTML = show ? EYE_CLOSED : EYE_OPEN;
                btn.title = show ? 'Passwort verstecken' : 'Passwort anzeigen';
                btn.setAttribute('aria-label', btn.title);
                input.focus();
            });
            wrap.appendChild(btn);
        });
    }

    function init() {
        setupPasswordToggles();
        setupListeners();
        updateNavUI();
        if (!sb) return;

        sb.auth.onAuthStateChange((event, session) => {
            state.user = session ? session.user : null;
            if (event === 'PASSWORD_RECOVERY') {
                state.inRecovery = true;
                setTimeout(() => openAuth('reset-password', 'Wähle jetzt ein neues Passwort.'), 0);
                return;
            }
            if (!state.user) {
                state.profile = null;
                updateNavUI();
                return;
            }
            // Supabase-Aufrufe nicht direkt im Callback ausführen (sonst kann es hängen)
            setTimeout(() => { afterLogin(); }, 0);
        });
    }

    // Für spätere Erweiterungen (z. B. Rangliste)
    window.FlaggenAuth = {
        get client() { return sb; },
        get user() { return state.user; },
        get profile() { return state.profile; },
        isConfigured,
        openAuth
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
