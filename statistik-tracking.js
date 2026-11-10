/**
 * Flaggen-Raten.de - Besucherstatistik
 * - keine Cookies, nichts wird auf dem Gerät gespeichert
 * - keine IP-Adressen gespeichert, nur Tages-Summen
 * Braucht supabase-config.js und supabase-statistik.sql.
 */
(function () {
    const cfg = window.SUPABASE_CONFIG || {};
    const host = window.location.hostname;

    // Nur auf der echten Seite zählen (nicht beim Testen am eigenen PC)
    const istEchteSeite = host === 'flaggen-raten.de' || host === 'www.flaggen-raten.de';
    // Suchmaschinen-Bots und automatische Browser nicht mitzählen
    const istBot = navigator.webdriver || /bot|crawl|spider|slurp|lighthouse|headless|preview/i.test(navigator.userAgent);
    const aktiv = Boolean(istEchteSeite && !istBot && cfg.url && cfg.anonKey && !cfg.url.includes('DEIN-PROJEKT'));

    function rpc(name, body, keepalive) {
        if (!aktiv) return;
        try {
            fetch(`${cfg.url}/rest/v1/rpc/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    apikey: cfg.anonKey,
                    Authorization: `Bearer ${cfg.anonKey}`
                },
                body: JSON.stringify(body),
                keepalive: Boolean(keepalive)
            }).catch(() => {});
        } catch (e) {}
    }

    // ---------- Besuch ----------
    const istHandy = window.matchMedia
        ? window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
        : window.innerWidth < 768;
    rpc('track_visit', { p_mobile: istHandy });

    // ---------- Verweildauer (nur Zeit, in der die Seite sichtbar ist) ----------
    let sichtbarSeit = document.visibilityState === 'visible' ? Date.now() : null;
    let gesammelt = 0;
    let ersteMeldung = true;

    function dauerSenden() {
        if (sichtbarSeit !== null) {
            gesammelt += Date.now() - sichtbarSeit;
            sichtbarSeit = null;
        }
        const sekunden = Math.round(gesammelt / 1000);
        if (sekunden < 1) return;
        rpc('track_duration', { p_seconds: sekunden, p_first: ersteMeldung }, true);
        ersteMeldung = false;
        gesammelt = 0;
    }

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            dauerSenden();
        } else if (sichtbarSeit === null) {
            sichtbarSeit = Date.now();
        }
    });
    window.addEventListener('pagehide', dauerSenden);

    // ---------- Gespielte Runden ----------
    window.FlaggenStats = {
        runde(mode, level) {
            const lvl = (mode === 'endless' || mode === 'time-attack') ? 0 : (parseInt(level, 10) || 0);
            rpc('track_game', { p_mode: mode, p_level: lvl });
        }
    };
})();
