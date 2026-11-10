/**
 * Flaggen-Raten.de - Endless-Rangliste (Top 30)
 * Braucht auth.js (window.FlaggenAuth) und supabase-rangliste.sql in Supabase.
 */
(function () {
    const $ = (id) => document.getElementById(id);
    const MEDAILLEN = { 1: '🥇', 2: '🥈', 3: '🥉' };

    function auth() {
        return window.FlaggenAuth || null;
    }

    function client() {
        const a = auth();
        return a && a.isConfigured ? a.client : null;
    }

    function isLoggedIn() {
        const a = auth();
        return Boolean(a && a.user && a.profile);
    }

    function setStatus(text) {
        const el = $('rangliste-status');
        if (!el) return;
        el.textContent = text;
        el.style.display = text ? 'block' : 'none';
    }

    function renderRows(rows) {
        const list = $('rangliste-liste');
        if (!list) return;
        list.innerHTML = '';

        rows.forEach(row => {
            const li = document.createElement('li');
            li.className = 'rangliste-zeile' + (row.is_me ? ' ist-ich' : '') + (row.platz <= 3 ? ` top-${row.platz}` : '');

            const platz = document.createElement('span');
            platz.className = 'rangliste-platz';
            platz.textContent = MEDAILLEN[row.platz] || `${row.platz}.`;

            const name = document.createElement('span');
            name.className = 'rangliste-name';
            name.textContent = row.display_name + (row.is_me ? ' (du)' : '');

            const score = document.createElement('span');
            score.className = 'rangliste-score';
            score.textContent = row.best_score;

            li.append(platz, name, score);
            list.appendChild(li);
        });
    }

    function renderFooter(myRank, inTop) {
        const footer = $('rangliste-footer');
        if (!footer) return;
        footer.innerHTML = '';

        if (!isLoggedIn()) {
            const text = document.createElement('span');
            text.textContent = 'Melde dich an, damit deine Scores in der Rangliste erscheinen.';
            const btn = document.createElement('button');
            btn.className = 'btn btn-secondary rangliste-login-btn';
            btn.textContent = 'Login / Registrieren';
            btn.addEventListener('click', () => {
                const loginBtn = $('btn-open-login');
                if (loginBtn) loginBtn.click();
            });
            footer.append(text, btn);
            return;
        }

        const text = document.createElement('span');
        if (myRank && !inTop) {
            text.innerHTML = '';
            text.append('Dein Platz: ');
            const b = document.createElement('strong');
            b.textContent = `#${myRank.platz} mit ${myRank.best_score} Punkten`;
            text.appendChild(b);
        } else if (!myRank) {
            text.textContent = 'Spiel eine Runde Endless, um in die Rangliste zu kommen!';
        } else {
            text.textContent = 'Du bist in den Top 30! 🎉';
        }
        footer.appendChild(text);
    }

    async function laden() {
        const card = $('rangliste-card');
        if (!card) return;

        const sb = client();
        if (!sb) {
            renderRows([]);
            setStatus('Die Rangliste ist noch nicht eingerichtet.');
            const footer = $('rangliste-footer');
            if (footer) footer.innerHTML = '';
            return;
        }

        setStatus('Rangliste wird geladen …');
        const { data, error } = await sb.rpc('get_endless_leaderboard');
        if (error) {
            console.warn('Rangliste-Fehler', error);
            renderRows([]);
            setStatus('Die Rangliste konnte nicht geladen werden. Bist du online?');
            return;
        }

        const rows = data || [];
        renderRows(rows);
        setStatus(rows.length === 0 ? 'Noch keine Einträge – sei die oder der Erste!' : '');

        let myRank = null;
        if (isLoggedIn()) {
            const res = await sb.rpc('get_my_endless_rank');
            if (!res.error && res.data && res.data.length) myRank = res.data[0];
        }
        renderFooter(myRank, rows.some(r => r.is_me));
    }

    // Wird am Ende einer Endless-Runde aufgerufen. Gibt den Platz zurück (oder null).
    async function scoreSenden(score) {
        const sb = client();
        if (!sb || !isLoggedIn() || score <= 0) return null;

        const { error } = await sb.rpc('submit_endless_score', { score });
        if (error) {
            console.warn('Score konnte nicht gespeichert werden', error);
            return null;
        }
        const res = await sb.rpc('get_my_endless_rank');
        if (res.error || !res.data || !res.data.length) return null;
        return res.data[0];
    }

    function laender(n) {
        return `${n} ${n === 1 ? 'Land' : 'Länder'}`;
    }

    // Ergebnis-Bildschirm nach Endless: Platz + wie viele Länder bis zum nächsten Ziel fehlen
    async function ergebnisAnzeigen(score, el) {
        if (!el) return;
        const sb = client();
        if (!sb || score <= 0) {
            el.style.display = 'none';
            return;
        }

        el.innerHTML = '';
        el.textContent = 'Platz wird berechnet …';
        el.style.display = 'block';

        const loggedIn = isLoggedIn();
        let bestScore = score;
        if (loggedIn) {
            const meinRang = await scoreSenden(score);
            if (meinRang) bestScore = Math.max(score, meinRang.best_score);
        }

        const { data, error } = await sb.rpc('get_endless_rank_info', { score: bestScore });
        if (error || !data || !data.length) {
            console.warn('Platz konnte nicht berechnet werden', error);
            el.textContent = loggedIn
                ? 'Dein Score wurde gespeichert. Den Platz konnten wir gerade nicht berechnen.'
                : 'Melde dich an, damit deine Scores in der Rangliste erscheinen.';
            return;
        }

        const info = data[0];
        const zeilen = [];

        if (loggedIn) {
            const spieler = Math.max(info.spieler, 1);
            let z = `🏆 Rangliste: Platz ${info.platz} von ${spieler} ${spieler === 1 ? 'Spieler' : 'Spielern'}`;
            if (bestScore > score) z += ` (mit deinem Bestwert von ${bestScore})`;
            zeilen.push(z);
        } else {
            const spieler = info.spieler + 1;
            zeilen.push(`🏆 Mit ${score} Punkten wärst du auf Platz ${info.platz} von ${spieler} Spielern.`);
        }

        // Nächstes Ziel
        const nichtInTop30 = info.top30_grenze !== null && info.platz > 30;
        if (info.platz === 1) {
            zeilen.push(loggedIn ? '👑 Platz 1 – besser geht es nicht!' : '👑 Das wäre Platz 1!');
        } else if (nichtInTop30) {
            const fehlen = info.top30_grenze - bestScore + 1;
            zeilen.push(`📈 Noch ${laender(fehlen)} mehr, dann bist du in den Top 30!`);
        } else if (info.naechster_score !== null) {
            const fehlen = info.naechster_score - bestScore + 1;
            zeilen.push(`⬆️ Noch ${laender(fehlen)} mehr für Platz ${info.naechster_platz}!`);
        }

        if (!loggedIn) {
            zeilen.push('Melde dich an, damit dein Score in der Rangliste zählt.');
        }

        el.innerHTML = '';
        zeilen.forEach((text, i) => {
            const div = document.createElement('div');
            div.className = i === 0 ? 'rank-note-main' : 'rank-note-sub';
            div.textContent = text;
            el.appendChild(div);
        });
    }

    // Endless-Highscore mit dem Account abgleichen:
    // eingeloggt -> Bestwert aus der Datenbank, ausgeloggt -> lokaler Wert wird gelöscht
    const ENDLESS_KEY = 'flaggen_endless_highscore';
    let warEingeloggt = false;

    function highscoreAnzeigen() {
        if (typeof updateAllHomePreviews === 'function') updateAllHomePreviews();
        const hs = document.getElementById('endless-highscore-value');
        if (hs && typeof getEndlessHighscore === 'function') hs.textContent = getEndlessHighscore();
    }

    async function highscoreAbgleichen() {
        const sb = client();
        if (!sb) return;

        if (!isLoggedIn()) {
            if (warEingeloggt) {
                try { localStorage.removeItem(ENDLESS_KEY); } catch (e) {}
                highscoreAnzeigen();
            }
            warEingeloggt = false;
            return;
        }
        warEingeloggt = true;

        const res = await sb.rpc('get_my_endless_rank');
        if (res.error) return;
        const best = res.data && res.data.length ? res.data[0].best_score : 0;
        try { localStorage.setItem(ENDLESS_KEY, String(best)); } catch (e) {}
        highscoreAnzeigen();
    }

    document.addEventListener('flaggen-auth-changed', highscoreAbgleichen);

    window.FlaggenRangliste = { laden, scoreSenden, isLoggedIn, ergebnisAnzeigen };

    // Bei Login/Logout neu laden, wenn die Endless-Seite offen ist
    document.addEventListener('flaggen-auth-changed', () => {
        const view = $('view-endless');
        if (view && view.classList.contains('active')) laden();
    });
})();
