/**
 * Flaggen-Raten.de - Enhanced Game Engine with 4 Game Modes, Web Audio API Sound Effects & Multi-Mode Progress
 */

// 195 Länder, aufgeteilt in 5 Level à 39 Länder (sortiert nach Schwierigkeit)
const levelsData = {
    1: {
        title: "Level 1",
        description: "Die bekanntesten Flaggen der Welt zum Einstieg.",
        badge: "Sehr Einfach",
        countries: [
            { name: "Deutschland", code: "de" }, { name: "Frankreich", code: "fr" }, { name: "Italien", code: "it" },
            { name: "Spanien", code: "es" }, { name: "Portugal", code: "pt" }, { name: "Vereinigtes Königreich", code: "gb" },
            { name: "Irland", code: "ie" }, { name: "Niederlande", code: "nl" }, { name: "Belgien", code: "be" },
            { name: "Schweiz", code: "ch" }, { name: "Österreich", code: "at" }, { name: "Dänemark", code: "dk" },
            { name: "Schweden", code: "se" }, { name: "Norwegen", code: "no" }, { name: "Finnland", code: "fi" },
            { name: "Island", code: "is" }, { name: "Griechenland", code: "gr" }, { name: "Türkei", code: "tr" },
            { name: "Polen", code: "pl" }, { name: "Ukraine", code: "ua" }, { name: "Russland", code: "ru" },
            { name: "USA", code: "us" }, { name: "Kanada", code: "ca" }, { name: "Mexiko", code: "mx" },
            { name: "Brasilien", code: "br" }, { name: "Argentinien", code: "ar" }, { name: "Japan", code: "jp" },
            { name: "China", code: "cn" }, { name: "Südkorea", code: "kr" }, { name: "Indien", code: "in" },
            { name: "Australien", code: "au" }, { name: "Neuseeland", code: "nz" }, { name: "Südafrika", code: "za" },
            { name: "Ägypten", code: "eg" }, { name: "Israel", code: "il" }, { name: "Saudi-Arabien", code: "sa" },
            { name: "Kroatien", code: "hr" }, { name: "Tschechien", code: "cz" }, { name: "Jamaika", code: "jm" }
        ]
    },
    2: {
        title: "Level 2",
        description: "Bekannte Länder aus Europa, Asien, Afrika und Amerika.",
        badge: "Einfach",
        countries: [
            { name: "Luxemburg", code: "lu" }, { name: "Ungarn", code: "hu" }, { name: "Rumänien", code: "ro" },
            { name: "Bulgarien", code: "bg" }, { name: "Serbien", code: "rs" }, { name: "Slowakei", code: "sk" },
            { name: "Slowenien", code: "si" }, { name: "Estland", code: "ee" }, { name: "Lettland", code: "lv" },
            { name: "Litauen", code: "lt" }, { name: "Malta", code: "mt" }, { name: "Zypern", code: "cy" },
            { name: "Albanien", code: "al" }, { name: "Monaco", code: "mc" }, { name: "Vatikanstadt", code: "va" },
            { name: "Thailand", code: "th" }, { name: "Vietnam", code: "vn" }, { name: "Indonesien", code: "id" },
            { name: "Philippinen", code: "ph" }, { name: "Malaysia", code: "my" }, { name: "Singapur", code: "sg" },
            { name: "Pakistan", code: "pk" }, { name: "Iran", code: "ir" }, { name: "Irak", code: "iq" },
            { name: "Afghanistan", code: "af" }, { name: "Nordkorea", code: "kp" }, { name: "Nepal", code: "np" },
            { name: "Marokko", code: "ma" }, { name: "Nigeria", code: "ng" }, { name: "Kenia", code: "ke" },
            { name: "Ghana", code: "gh" }, { name: "Kolumbien", code: "co" }, { name: "Chile", code: "cl" },
            { name: "Peru", code: "pe" }, { name: "Venezuela", code: "ve" }, { name: "Uruguay", code: "uy" },
            { name: "Vereinigte Arabische Emirate", code: "ae" }, { name: "Libanon", code: "lb" }, { name: "Kuba", code: "cu" }
        ]
    },
    3: {
        title: "Level 3",
        description: "Balkan, Kaukasus, Zentralasien, Nahost und die Karibik.",
        badge: "Mittel",
        countries: [
            { name: "Bosnien und Herzegowina", code: "ba" }, { name: "Montenegro", code: "me" }, { name: "Nordmazedonien", code: "mk" },
            { name: "Georgien", code: "ge" }, { name: "Armenien", code: "am" }, { name: "Aserbaidschan", code: "az" },
            { name: "Kasachstan", code: "kz" }, { name: "Usbekistan", code: "uz" }, { name: "Belarus", code: "by" },
            { name: "Liechtenstein", code: "li" }, { name: "Andorra", code: "ad" }, { name: "San Marino", code: "sm" },
            { name: "Bolivien", code: "bo" }, { name: "Paraguay", code: "py" }, { name: "Ecuador", code: "ec" },
            { name: "Costa Rica", code: "cr" }, { name: "Panama", code: "pa" }, { name: "Dominikanische Republik", code: "do" },
            { name: "Haiti", code: "ht" }, { name: "Bahamas", code: "bs" }, { name: "Trinidad und Tobago", code: "tt" },
            { name: "Bangladesch", code: "bd" }, { name: "Sri Lanka", code: "lk" }, { name: "Myanmar", code: "mm" },
            { name: "Kambodscha", code: "kh" }, { name: "Laos", code: "la" }, { name: "Mongolei", code: "mn" },
            { name: "Malediven", code: "mv" }, { name: "Bahrain", code: "bh" }, { name: "Kuwait", code: "kw" },
            { name: "Jordanien", code: "jo" }, { name: "Syrien", code: "sy" }, { name: "Oman", code: "om" },
            { name: "Jemen", code: "ye" }, { name: "Tunesien", code: "tn" }, { name: "Algerien", code: "dz" },
            { name: "Libyen", code: "ly" }, { name: "Äthiopien", code: "et" }, { name: "Katar", code: "qa" }
        ]
    },
    4: {
        title: "Level 4",
        description: "Afrika, Zentralasien und der Pazifik.",
        badge: "Schwer",
        countries: [
            { name: "Moldawien", code: "md" }, { name: "Turkmenistan", code: "tm" }, { name: "Kirgisistan", code: "kg" },
            { name: "Tadschikistan", code: "tj" }, { name: "Bhutan", code: "bt" }, { name: "Brunei", code: "bn" },
            { name: "Osttimor", code: "tl" }, { name: "Papua-Neuguinea", code: "pg" }, { name: "Fidschi", code: "fj" },
            { name: "Sudan", code: "sd" }, { name: "Südsudan", code: "ss" }, { name: "Somalia", code: "so" },
            { name: "Eritrea", code: "er" }, { name: "Dschibuti", code: "dj" }, { name: "Uganda", code: "ug" },
            { name: "Ruanda", code: "rw" }, { name: "Demokratische Republik Kongo", code: "cd" }, { name: "Republik Kongo", code: "cg" },
            { name: "Kamerun", code: "cm" }, { name: "Elfenbeinküste", code: "ci" }, { name: "Senegal", code: "sn" },
            { name: "Mali", code: "ml" }, { name: "Niger", code: "ne" }, { name: "Burkina Faso", code: "bf" },
            { name: "Guinea", code: "gn" }, { name: "Guinea-Bissau", code: "gw" }, { name: "Sierra Leone", code: "sl" },
            { name: "Liberia", code: "lr" }, { name: "Gabun", code: "ga" }, { name: "Äquatorialguinea", code: "gq" },
            { name: "Angola", code: "ao" }, { name: "Mosambik", code: "mz" }, { name: "Simbabwe", code: "zw" },
            { name: "Sambia", code: "zm" }, { name: "Namibia", code: "na" }, { name: "Botswana", code: "bw" },
            { name: "Madagaskar", code: "mg" }, { name: "Mauritius", code: "mu" }, { name: "Tansania", code: "tz" }
        ]
    },
    5: {
        title: "Level 5",
        description: "Kleinstaaten, Inselnationen und leicht verwechselbare Flaggen.",
        badge: "Extrem",
        countries: [
            { name: "Tschad", code: "td" }, { name: "Zentralafrikanische Republik", code: "cf" }, { name: "Benin", code: "bj" },
            { name: "Togo", code: "tg" }, { name: "Gambia", code: "gm" }, { name: "Mauretanien", code: "mr" },
            { name: "Lesotho", code: "ls" }, { name: "Eswatini", code: "sz" }, { name: "Malawi", code: "mw" },
            { name: "Burundi", code: "bi" }, { name: "Komoren", code: "km" }, { name: "Kap Verde", code: "cv" },
            { name: "São Tomé und Príncipe", code: "st" }, { name: "Kiribati", code: "ki" }, { name: "Tuvalu", code: "tv" },
            { name: "Nauru", code: "nr" }, { name: "Marshallinseln", code: "mh" }, { name: "Mikronesien", code: "fm" },
            { name: "Palau", code: "pw" }, { name: "Samoa", code: "ws" }, { name: "Tonga", code: "to" },
            { name: "Salomonen", code: "sb" }, { name: "Vanuatu", code: "vu" }, { name: "Suriname", code: "sr" },
            { name: "Guyana", code: "gy" }, { name: "Belize", code: "bz" }, { name: "Guatemala", code: "gt" },
            { name: "Honduras", code: "hn" }, { name: "El Salvador", code: "sv" }, { name: "Nicaragua", code: "ni" },
            { name: "Antigua und Barbuda", code: "ag" }, { name: "Dominica", code: "dm" }, { name: "Grenada", code: "gd" },
            { name: "St. Kitts und Nevis", code: "kn" }, { name: "St. Lucia", code: "lc" }, { name: "St. Vincent und die Grenadinen", code: "vc" },
            { name: "Barbados", code: "bb" }, { name: "Palästina", code: "ps" }, { name: "Seychellen", code: "sc" }
        ]
    }
};

// Alle 195 Länder der Welt (193 UN-Mitglieder + Vatikanstadt + Palästina) für den Endless-Modus
const ALL_WORLD_COUNTRIES = [
    { name: "Afghanistan", code: "af" }, { name: "Ägypten", code: "eg" }, { name: "Albanien", code: "al" },
    { name: "Algerien", code: "dz" }, { name: "Andorra", code: "ad" }, { name: "Angola", code: "ao" },
    { name: "Antigua und Barbuda", code: "ag" }, { name: "Äquatorialguinea", code: "gq" }, { name: "Argentinien", code: "ar" },
    { name: "Armenien", code: "am" }, { name: "Aserbaidschan", code: "az" }, { name: "Äthiopien", code: "et" },
    { name: "Australien", code: "au" }, { name: "Bahamas", code: "bs" }, { name: "Bahrain", code: "bh" },
    { name: "Bangladesch", code: "bd" }, { name: "Barbados", code: "bb" }, { name: "Belarus", code: "by" },
    { name: "Belgien", code: "be" }, { name: "Belize", code: "bz" }, { name: "Benin", code: "bj" },
    { name: "Bhutan", code: "bt" }, { name: "Bolivien", code: "bo" }, { name: "Bosnien und Herzegowina", code: "ba" },
    { name: "Botswana", code: "bw" }, { name: "Brasilien", code: "br" }, { name: "Brunei", code: "bn" },
    { name: "Bulgarien", code: "bg" }, { name: "Burkina Faso", code: "bf" }, { name: "Burundi", code: "bi" },
    { name: "Chile", code: "cl" }, { name: "China", code: "cn" }, { name: "Costa Rica", code: "cr" },
    { name: "Dänemark", code: "dk" }, { name: "Demokratische Republik Kongo", code: "cd" }, { name: "Deutschland", code: "de" },
    { name: "Dominica", code: "dm" }, { name: "Dominikanische Republik", code: "do" }, { name: "Dschibuti", code: "dj" },
    { name: "Ecuador", code: "ec" }, { name: "El Salvador", code: "sv" }, { name: "Elfenbeinküste", code: "ci" },
    { name: "Eritrea", code: "er" }, { name: "Estland", code: "ee" }, { name: "Eswatini", code: "sz" },
    { name: "Fidschi", code: "fj" }, { name: "Finnland", code: "fi" }, { name: "Frankreich", code: "fr" },
    { name: "Gabun", code: "ga" }, { name: "Gambia", code: "gm" }, { name: "Georgien", code: "ge" },
    { name: "Ghana", code: "gh" }, { name: "Grenada", code: "gd" }, { name: "Griechenland", code: "gr" },
    { name: "Guatemala", code: "gt" }, { name: "Guinea", code: "gn" }, { name: "Guinea-Bissau", code: "gw" },
    { name: "Guyana", code: "gy" }, { name: "Haiti", code: "ht" }, { name: "Honduras", code: "hn" },
    { name: "Indien", code: "in" }, { name: "Indonesien", code: "id" }, { name: "Irak", code: "iq" },
    { name: "Iran", code: "ir" }, { name: "Irland", code: "ie" }, { name: "Island", code: "is" },
    { name: "Israel", code: "il" }, { name: "Italien", code: "it" }, { name: "Jamaika", code: "jm" },
    { name: "Japan", code: "jp" }, { name: "Jemen", code: "ye" }, { name: "Jordanien", code: "jo" },
    { name: "Kambodscha", code: "kh" }, { name: "Kamerun", code: "cm" }, { name: "Kanada", code: "ca" },
    { name: "Kap Verde", code: "cv" }, { name: "Kasachstan", code: "kz" }, { name: "Katar", code: "qa" },
    { name: "Kenia", code: "ke" }, { name: "Kirgisistan", code: "kg" }, { name: "Kiribati", code: "ki" },
    { name: "Kolumbien", code: "co" }, { name: "Komoren", code: "km" }, { name: "Kroatien", code: "hr" },
    { name: "Kuba", code: "cu" }, { name: "Kuwait", code: "kw" }, { name: "Laos", code: "la" },
    { name: "Lesotho", code: "ls" }, { name: "Lettland", code: "lv" }, { name: "Libanon", code: "lb" },
    { name: "Liberia", code: "lr" }, { name: "Libyen", code: "ly" }, { name: "Liechtenstein", code: "li" },
    { name: "Litauen", code: "lt" }, { name: "Luxemburg", code: "lu" }, { name: "Madagaskar", code: "mg" },
    { name: "Malawi", code: "mw" }, { name: "Malaysia", code: "my" }, { name: "Malediven", code: "mv" },
    { name: "Mali", code: "ml" }, { name: "Malta", code: "mt" }, { name: "Marokko", code: "ma" },
    { name: "Marshallinseln", code: "mh" }, { name: "Mauretanien", code: "mr" }, { name: "Mauritius", code: "mu" },
    { name: "Mexiko", code: "mx" }, { name: "Mikronesien", code: "fm" }, { name: "Moldawien", code: "md" },
    { name: "Monaco", code: "mc" }, { name: "Mongolei", code: "mn" }, { name: "Montenegro", code: "me" },
    { name: "Mosambik", code: "mz" }, { name: "Myanmar", code: "mm" }, { name: "Namibia", code: "na" },
    { name: "Nauru", code: "nr" }, { name: "Nepal", code: "np" }, { name: "Neuseeland", code: "nz" },
    { name: "Nicaragua", code: "ni" }, { name: "Niederlande", code: "nl" }, { name: "Niger", code: "ne" },
    { name: "Nigeria", code: "ng" }, { name: "Nordkorea", code: "kp" }, { name: "Nordmazedonien", code: "mk" },
    { name: "Norwegen", code: "no" }, { name: "Oman", code: "om" }, { name: "Österreich", code: "at" },
    { name: "Osttimor", code: "tl" }, { name: "Pakistan", code: "pk" }, { name: "Palästina", code: "ps" },
    { name: "Palau", code: "pw" }, { name: "Panama", code: "pa" }, { name: "Papua-Neuguinea", code: "pg" },
    { name: "Paraguay", code: "py" }, { name: "Peru", code: "pe" }, { name: "Philippinen", code: "ph" },
    { name: "Polen", code: "pl" }, { name: "Portugal", code: "pt" }, { name: "Republik Kongo", code: "cg" },
    { name: "Ruanda", code: "rw" }, { name: "Rumänien", code: "ro" }, { name: "Russland", code: "ru" },
    { name: "Salomonen", code: "sb" }, { name: "Sambia", code: "zm" }, { name: "Samoa", code: "ws" },
    { name: "San Marino", code: "sm" }, { name: "São Tomé und Príncipe", code: "st" }, { name: "Saudi-Arabien", code: "sa" },
    { name: "Schweden", code: "se" }, { name: "Schweiz", code: "ch" }, { name: "Senegal", code: "sn" },
    { name: "Serbien", code: "rs" }, { name: "Seychellen", code: "sc" }, { name: "Sierra Leone", code: "sl" },
    { name: "Simbabwe", code: "zw" }, { name: "Singapur", code: "sg" }, { name: "Slowakei", code: "sk" },
    { name: "Slowenien", code: "si" }, { name: "Somalia", code: "so" }, { name: "Spanien", code: "es" },
    { name: "Sri Lanka", code: "lk" }, { name: "St. Kitts und Nevis", code: "kn" }, { name: "St. Lucia", code: "lc" },
    { name: "St. Vincent und die Grenadinen", code: "vc" }, { name: "Südafrika", code: "za" }, { name: "Sudan", code: "sd" },
    { name: "Südkorea", code: "kr" }, { name: "Südsudan", code: "ss" }, { name: "Suriname", code: "sr" },
    { name: "Syrien", code: "sy" }, { name: "Tadschikistan", code: "tj" }, { name: "Tansania", code: "tz" },
    { name: "Thailand", code: "th" }, { name: "Togo", code: "tg" }, { name: "Tonga", code: "to" },
    { name: "Trinidad und Tobago", code: "tt" }, { name: "Tschad", code: "td" }, { name: "Tschechien", code: "cz" },
    { name: "Tunesien", code: "tn" }, { name: "Türkei", code: "tr" }, { name: "Turkmenistan", code: "tm" },
    { name: "Tuvalu", code: "tv" }, { name: "Uganda", code: "ug" }, { name: "Ukraine", code: "ua" },
    { name: "Ungarn", code: "hu" }, { name: "Uruguay", code: "uy" }, { name: "USA", code: "us" },
    { name: "Usbekistan", code: "uz" }, { name: "Vanuatu", code: "vu" }, { name: "Vatikanstadt", code: "va" },
    { name: "Venezuela", code: "ve" }, { name: "Vereinigte Arabische Emirate", code: "ae" }, { name: "Vereinigtes Königreich", code: "gb" },
    { name: "Vietnam", code: "vn" }, { name: "Zentralafrikanische Republik", code: "cf" }, { name: "Zypern", code: "cy" }
];

const ENDLESS_STORAGE_KEY = 'flaggen_endless_highscore';

function getEndlessHighscore() {
    try {
        return parseInt(localStorage.getItem(ENDLESS_STORAGE_KEY), 10) || 0;
    } catch (e) {
        return 0;
    }
}

// Speichert den Score, wenn er besser ist. Gibt true zurück bei neuem Highscore.
function saveEndlessHighscore(score) {
    if (score <= getEndlessHighscore()) return false;
    try {
        localStorage.setItem(ENDLESS_STORAGE_KEY, String(score));
    } catch (e) {}
    return true;
}

// Global App State
let gameState = {
    currentView: 'home',
    activeMode: 'flag-to-name',
    activeLevel: 1,
    questions: [],
    currentIndex: 0,
    score: 0,
    lives: 3,
    isAnswerLocked: false,
    timeAttackSeconds: 60,
    timerInterval: null,
    answerTimeout: null,   // Wartezeit nach einer Antwort
    runId: 0               // zählt jede neue Runde hoch, damit alte Timer nichts mehr auslösen
};

const TIME_ATTACK_PENALTY = 3; // Sekunden Abzug bei falscher Antwort
const TIME_ATTACK_KEY = 'flaggen_timeattack_best';

function getTimeAttackBest() {
    try {
        return parseInt(localStorage.getItem(TIME_ATTACK_KEY), 10) || 0;
    } catch (e) {
        return 0;
    }
}

function saveTimeAttackBest(score) {
    if (score <= getTimeAttackBest()) return false;
    try {
        localStorage.setItem(TIME_ATTACK_KEY, String(score));
    } catch (e) {}
    return true;
}

// Laufende Timer der aktuellen Runde stoppen
function stopRunTimers() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    if (gameState.answerTimeout) {
        clearTimeout(gameState.answerTimeout);
        gameState.answerTimeout = null;
    }
}

// ==========================================
// Web Audio API Sound Synthesizer
// ==========================================
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Sound-Einstellung (wird im Browser gespeichert)
const SOUND_STORAGE_KEY = 'flaggen_sound_enabled';
let soundEnabled = true;
try {
    soundEnabled = localStorage.getItem(SOUND_STORAGE_KEY) !== 'false';
} catch (e) {}

function setSoundEnabled(enabled) {
    soundEnabled = enabled;
    try {
        localStorage.setItem(SOUND_STORAGE_KEY, enabled ? 'true' : 'false');
    } catch (e) {}
}

// ==========================================
// Einstellungen (werden im Browser gespeichert)
// ==========================================
const SETTINGS_KEY = 'flaggen_settings';
const TEMPO_MS = { fast: 500, normal: 1200, slow: 2500 };
let settings = { theme: 'dark', tempo: 'normal', vibration: true, keyboard: true };
try {
    settings = Object.assign(settings, JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}'));
} catch (e) {}

function saveSettings() {
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {}
}

function applyTheme() {
    let theme = settings.theme;
    if (theme === 'auto') {
        theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);
}

if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => { if (settings.theme === 'auto') applyTheme(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
}

function vibrate(ms) {
    if (settings.vibration && navigator.vibrate) {
        try { navigator.vibrate(ms); } catch (e) {}
    }
}

// Spielt einen weichen Ton (Sinus mit sanftem Ein- und Ausblenden)
function playTone(freq, startTime, duration, volume) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
}

function playSound(type) {
    if (!soundEnabled) return;
    try {
        initAudio();
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const now = audioCtx.currentTime;

        if (type === 'correct') {
            // Zwei helle, kurze Töne nach oben (E5 -> A5)
            playTone(659.25, now, 0.18, 0.07);
            playTone(880.00, now + 0.09, 0.25, 0.07);
        } else if (type === 'incorrect') {
            // Leiser, tiefer, weicher "Dumpf"-Ton statt Schnarren
            playTone(246.94, now, 0.22, 0.06);
            playTone(196.00, now + 0.1, 0.3, 0.05);
        } else if (type === 'click') {
            // Kaum hörbarer, kurzer Klick
            playTone(520, now, 0.06, 0.025);
        } else if (type === 'win') {
            // Kleine Dur-Melodie (C5 E5 G5 C6), leise
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
                playTone(freq, now + idx * 0.12, 0.35, 0.06);
            });
        }
    } catch (e) {
        console.log("Audio error", e);
    }
}

// Multi-Mode Progress Logic
const CORE_MODES = ['flag-to-name', 'name-to-flag', 'map-mode'];

function getModeStorageKey(levelId, mode) {
    return `flaggen_lvl_${levelId}_mode_${mode}`;
}

// Bester Prozentwert eines einzelnen Modus (0-100)
function getModePercent(levelId, mode) {
    try {
        const data = JSON.parse(localStorage.getItem(getModeStorageKey(levelId, mode)) || 'null');
        if (!data) return 0;
        const total = levelsData[levelId].countries.length;
        return Math.min(100, Math.round(((data.score || 0) / total) * 100));
    } catch (e) {
        return 0;
    }
}

function loadLevelStats(levelId) {
    let totalScoreSum = 0;
    let totalMaxPossible = levelsData[levelId].countries.length * CORE_MODES.length;

    CORE_MODES.forEach(mode => {
        try {
            const data = localStorage.getItem(getModeStorageKey(levelId, mode));
            if (data) {
                const parsed = JSON.parse(data);
                totalScoreSum += (parsed.score || 0);
            }
        } catch (e) {}
    });

    // Gleiche Berechnung wie auf der Level-Seite: Durchschnitt der 3 Modus-Prozente
    const percent = Math.round(CORE_MODES.reduce((sum, mode) => sum + getModePercent(levelId, mode), 0) / CORE_MODES.length);
    const maxMasteredAcrossModes = Math.min(levelsData[levelId].countries.length, Math.round(totalScoreSum / CORE_MODES.length));

    return {
        bestPercent: percent,
        masteredCount: maxMasteredAcrossModes,
        total: levelsData[levelId].countries.length
    };
}

function saveLevelStats(levelId, mode, score, total) {
    if (mode === 'time-attack') {
        // Time attack doesn't count towards permanent level completion percentage
        return loadLevelStats(levelId);
    }

    // Nur speichern, wenn das neue Ergebnis besser ist als das bisherige
    try {
        const alt = JSON.parse(localStorage.getItem(getModeStorageKey(levelId, mode)) || 'null');
        if (alt && (alt.score || 0) >= score) {
            return loadLevelStats(levelId);
        }
    } catch (e) {}

    const percent = Math.round((score / total) * 100);
    const statsToSave = { score, total, percent };

    try {
        localStorage.setItem(getModeStorageKey(levelId, mode), JSON.stringify(statsToSave));
    } catch (e) {
        console.error("Error saving mode progress", e);
    }

    return loadLevelStats(levelId);
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    updateAllHomePreviews();
    setupEventListeners();
    navigateToView('home');
}

// View Router
function navigateToView(viewName) {
    gameState.currentView = viewName;

    if (viewName !== 'quiz') {
        stopRunTimers();
        gameState.runId++;
    }

    const views = document.querySelectorAll('.view');
    views.forEach(v => v.classList.remove('active'));

    const target = document.getElementById(`view-${viewName}`);
    if (target) {
        target.classList.add('active');
    }
    // Info-Text nur auf der Startseite zeigen
    document.body.classList.toggle('on-home', viewName === 'home');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update Home Previews
function updateAllHomePreviews() {
    for (let lvl = 1; lvl <= 5; lvl++) {
        const previewEl = document.getElementById(`preview-progress-${lvl}`);
        if (previewEl) {
            const stats = loadLevelStats(lvl);
            previewEl.textContent = `${stats.bestPercent}%`;
        }
    }

    const endlessEl = document.getElementById('preview-endless-highscore');
    if (endlessEl) endlessEl.textContent = getEndlessHighscore();
}

// Event Listeners Setup
function setupEventListeners() {

    const homeTriggers = document.querySelectorAll('#nav-brand, #nav-home-btn, #btn-back-to-home, #btn-result-to-home');
    homeTriggers.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                playSound('click');
                navigateToView('home');
            });
        }
    });

    const levelCards = document.querySelectorAll('.level-card-btn[data-level]');
    levelCards.forEach(card => {
        card.addEventListener('click', () => {
            playSound('click');
            const levelId = parseInt(card.getAttribute('data-level'), 10);
            openLevelDetail(levelId);
        });
    });

    const modePills = document.querySelectorAll('.mode-pill-btn');
    modePills.forEach(pill => {
        pill.addEventListener('click', () => {
            playSound('click');
            const mode = pill.getAttribute('data-mode');
            gameState.activeMode = mode;
            modePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            if (mode === 'map-mode') ensureMapLibs().catch(() => {});
        });
    });

    // Endless-Modus
    const openEndlessBtn = document.getElementById('btn-open-endless');
    if (openEndlessBtn) {
        openEndlessBtn.addEventListener('click', () => {
            playSound('click');
            openEndlessView();
        });
    }

    const startEndlessBtn = document.getElementById('btn-start-endless');
    if (startEndlessBtn) {
        startEndlessBtn.addEventListener('click', () => {
            playSound('click');
            startQuiz(gameState.activeLevel, 'endless');
        });
    }

    const reloadRanglisteBtn = document.getElementById('btn-rangliste-reload');
    if (reloadRanglisteBtn) {
        reloadRanglisteBtn.addEventListener('click', () => {
            if (window.FlaggenRangliste) window.FlaggenRangliste.laden();
        });
    }

    const endlessBackBtn = document.getElementById('btn-endless-back');
    if (endlessBackBtn) {
        endlessBackBtn.addEventListener('click', () => {
            playSound('click');
            navigateToView('home');
        });
    }

    const startLevelBtn = document.getElementById('btn-start-level');
    if (startLevelBtn) {
        startLevelBtn.addEventListener('click', () => {
            playSound('click');
            startQuiz(gameState.activeLevel, gameState.activeMode);
        });
    }

    const searchInput = document.getElementById('country-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderCountriesGrid(gameState.activeLevel, e.target.value);
        });
    }

    const quitQuizBtn = document.getElementById('btn-quit-quiz');
    if (quitQuizBtn) {
        quitQuizBtn.addEventListener('click', () => {
            playSound('click');
            pauseTimeAttack();
            openModal('modal-quit');
        });
    }

    const quitConfirmBtn = document.getElementById('btn-quit-confirm');
    if (quitConfirmBtn) {
        quitConfirmBtn.addEventListener('click', () => {
            closeAllModals();
            navigateToView('home');
        });
    }
    const quitCancelBtn = document.getElementById('btn-quit-cancel');
    if (quitCancelBtn) {
        quitCancelBtn.addEventListener('click', () => {
            closeAllModals();
        });
    }

    const retryBtn = document.getElementById('btn-retry-level');
    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            playSound('click');
            startQuiz(gameState.activeLevel, gameState.activeMode);
        });
    }

    const resultToMenuBtn = document.getElementById('btn-result-to-menu');
    if (resultToMenuBtn) {
        resultToMenuBtn.addEventListener('click', () => {
            playSound('click');
            if (gameState.activeMode === 'endless') {
                openEndlessView();
            } else {
                openLevelDetail(gameState.activeLevel);
            }
        });
    }

    const dsBtn = document.getElementById('btn-open-datenschutz');
    const impBtn = document.getElementById('btn-open-impressum');
    const modalOverlay = document.getElementById('modal-overlay');

    if (dsBtn) dsBtn.addEventListener('click', () => openModal('modal-datenschutz'));

    const settingsBtn = document.getElementById('btn-open-settings');
    if (settingsBtn) settingsBtn.addEventListener('click', () => openModal('modal-einstellungen'));

    setupSettingsUI();

    const soundToggle = document.getElementById('sound-toggle-checkbox');
    if (soundToggle) {
        soundToggle.checked = soundEnabled;
        soundToggle.addEventListener('change', () => {
            setSoundEnabled(soundToggle.checked);
            playSound('click');
        });
    }
    if (impBtn) impBtn.addEventListener('click', () => openModal('modal-impressum'));

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeAllModals();
        });
    }

    const closeButtons = document.querySelectorAll('[data-close-modal]');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
}

// Einstellungs-Fenster
function setupSettingsUI() {
    const setupSegmented = (id, key, onChange) => {
        const group = document.getElementById(id);
        if (!group) return;
        const buttons = group.querySelectorAll('button');
        const update = () => buttons.forEach(b => b.classList.toggle('active', b.dataset.value === settings[key]));
        buttons.forEach(b => b.addEventListener('click', () => {
            settings[key] = b.dataset.value;
            saveSettings();
            update();
            if (onChange) onChange();
            playSound('click');
        }));
        update();
    };
    setupSegmented('setting-theme', 'theme', applyTheme);
    setupSegmented('setting-tempo', 'tempo');

    const setupSwitch = (id, key, onChange) => {
        const input = document.getElementById(id);
        if (!input) return;
        input.checked = Boolean(settings[key]);
        input.addEventListener('change', () => {
            settings[key] = input.checked;
            saveSettings();
            if (onChange) onChange();
        });
    };
    setupSwitch('vibration-toggle-checkbox', 'vibration', () => vibrate(80));
    setupSwitch('keyboard-toggle-checkbox', 'keyboard', () => {
        document.body.classList.toggle('keyboard-on', settings.keyboard);
    });
    document.body.classList.toggle('keyboard-on', settings.keyboard);

    // Fortschritt zurücksetzen
    const resetBtn = document.getElementById('btn-reset-progress');
    const resetConfirm = document.getElementById('reset-confirm');
    const resetDone = document.getElementById('reset-done');
    if (resetBtn && resetConfirm) {
        resetBtn.addEventListener('click', () => {
            resetConfirm.style.display = 'block';
            if (resetDone) resetDone.style.display = 'none';
        });
        document.getElementById('btn-reset-cancel').addEventListener('click', () => {
            resetConfirm.style.display = 'none';
        });
        document.getElementById('btn-reset-final').addEventListener('click', () => {
            resetAllProgress();
            resetConfirm.style.display = 'none';
            if (resetDone) resetDone.style.display = 'block';
        });
    }

    // Tastensteuerung
    document.addEventListener('keydown', handleKeyboard);
}

function resetAllProgress() {
    try {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith('flaggen_lvl_')) keys.push(k);
        }
        keys.forEach(k => localStorage.removeItem(k));
        localStorage.removeItem(ENDLESS_STORAGE_KEY);
        localStorage.removeItem(TIME_ATTACK_KEY);
    } catch (e) {}
    updateAllHomePreviews();
}

function handleKeyboard(e) {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('modal-overlay');
        const nameStep = document.getElementById('auth-panel-name');
        const mustChooseName = nameStep && nameStep.style.display !== 'none' && document.getElementById('modal-auth').classList.contains('active');
        if (overlay && overlay.classList.contains('active') && !mustChooseName) closeAllModals();
        return;
    }

    if (!settings.keyboard || gameState.currentView !== 'quiz' || gameState.isAnswerLocked) return;
    if (document.getElementById('modal-overlay').classList.contains('active')) return;
    if (e.target && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

    if (e.repeat) return; // Taste gedrückt halten zählt nicht
    const num = parseInt(e.key, 10);
    if (!(num >= 1 && num <= 4)) return;

    const containerId = gameState.activeMode === 'name-to-flag'
        ? 'flag-options-container'
        : gameState.activeMode === 'map-mode' ? 'map-options-container' : 'quiz-options-container';
    const buttons = document.querySelectorAll(`#${containerId} button`);
    if (buttons[num - 1]) {
        e.preventDefault();
        buttons[num - 1].click();
    }
}

// Kleine Zahl (1-4) für die Tastensteuerung an einen Antwort-Button hängen
function addKeyHint(btn, index) {
    const hint = document.createElement('span');
    hint.className = 'key-hint';
    hint.textContent = index + 1;
    btn.appendChild(hint);
}

// Open Level Detail View
function openLevelDetail(levelId) {
    gameState.activeLevel = levelId;

    // Nach Endless wieder auf einen normalen Modus zurückstellen
    if (gameState.activeMode === 'endless') {
        gameState.activeMode = 'flag-to-name';
    }
    document.querySelectorAll('.mode-pill-btn').forEach(pill => {
        pill.classList.toggle('active', pill.getAttribute('data-mode') === gameState.activeMode);
    });
    const levelData = levelsData[levelId];
    if (!levelData) return;

    const titleEl = document.getElementById('level-detail-title');
    const tagEl = document.getElementById('level-detail-tag');
    const descEl = document.getElementById('level-detail-desc');
    const countEl = document.getElementById('countries-list-count');

    if (titleEl) titleEl.textContent = levelData.title;
    if (tagEl) tagEl.textContent = `${levelData.title} • ${levelData.countries.length} Länder`;
    if (descEl) descEl.textContent = levelData.description;
    if (countEl) countEl.textContent = levelData.countries.length;

    // Fortschritt pro Modus: jeder Modus zählt ein Drittel
    let sum = 0;
    CORE_MODES.forEach(mode => {
        const modePercent = getModePercent(levelId, mode);
        sum += modePercent;

        const pillScore = document.getElementById(`score-pill-${mode}`);
        if (pillScore) {
            pillScore.textContent = `${modePercent}%`;
            pillScore.classList.toggle('done', modePercent === 100);
        }

        const seg = document.getElementById(`seg-${mode}`);
        if (seg) seg.style.width = `${modePercent / 3}%`;

        const legend = document.getElementById(`legend-${mode}`);
        if (legend) legend.textContent = `${Math.round(modePercent / 3)} / 33%`;
    });

    const taPill = document.getElementById('score-pill-time-attack');
    if (taPill) taPill.textContent = getTimeAttackBest() ? `🏆 ${getTimeAttackBest()}` : '—';

    const percent = Math.round(sum / 3);
    const percentEl = document.getElementById('level-progress-percent');
    if (percentEl) percentEl.textContent = `${percent}%`;

    const searchInput = document.getElementById('country-search-input');
    if (searchInput) searchInput.value = '';

    renderCountriesGrid(levelId, '');
    navigateToView('level-detail');
}

// Endless nur mit Account (wenn der Login eingerichtet ist)
function endlessNeedsLogin() {
    const fa = window.FlaggenAuth;
    return Boolean(fa && fa.isConfigured && !(fa.user && fa.profile));
}

function updateEndlessButton() {
    const btn = document.getElementById('btn-start-endless');
    const hint = document.getElementById('endless-login-hint');
    const locked = endlessNeedsLogin();
    if (btn) {
        btn.innerHTML = locked
            ? '<span class="btn-icon">🔒</span> Anmelden &amp; Endless spielen'
            : '<span class="btn-icon">▶</span> Endless starten';
    }
    if (hint) hint.style.display = locked ? 'block' : 'none';
}

document.addEventListener('flaggen-auth-changed', updateEndlessButton);

// Endless-Startseite öffnen
function openEndlessView() {
    updateEndlessButton();
    gameState.activeMode = 'endless';
    const hsEl = document.getElementById('endless-highscore-value');
    if (hsEl) hsEl.textContent = getEndlessHighscore();
    navigateToView('endless');
    if (window.FlaggenRangliste) window.FlaggenRangliste.laden();
}

// Render Countries Grid
function renderCountriesGrid(levelId, filterText = '') {
    const gridEl = document.getElementById('level-countries-grid');
    if (!gridEl) return;

    const levelData = levelsData[levelId];
    if (!levelData) return;

    const filtered = levelData.countries.filter(c =>
        c.name.toLowerCase().includes(filterText.toLowerCase())
    );

    gridEl.innerHTML = '';
    if (filtered.length === 0) {
        gridEl.innerHTML = '<p class="no-results">Keine Länder gefunden.</p>';
        return;
    }

    filtered.forEach(country => {
        const item = document.createElement('div');
        item.className = 'country-grid-item';
        item.innerHTML = `
            <img src="flags/${country.code}.svg" alt="${country.name}" loading="lazy">
            <span>${country.name}</span>
        `;
        gridEl.appendChild(item);
    });
}

// Kartendaten (ca. 800 KB) erst laden, wenn der Kartenmodus gebraucht wird
const MAP_SCRIPTS = ['lib/d3-array.min.js', 'lib/d3-geo.min.js', 'lib/topojson-client.min.js', 'lib/weltkarte-daten.js', 'karte.js'];
let mapLibsPromise = null;

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const el = document.createElement('script');
        el.src = src + (window.ASSET_VERSION ? `?v=${window.ASSET_VERSION}` : '');
        el.onload = resolve;
        el.onerror = () => reject(new Error('Konnte nicht laden: ' + src));
        document.body.appendChild(el);
    });
}

function ensureMapLibs() {
    if (window.renderCountryMap && window.WELT_TOPO) return Promise.resolve();
    if (!mapLibsPromise) {
        mapLibsPromise = MAP_SCRIPTS.reduce((p, src) => p.then(() => loadScript(src)), Promise.resolve())
            .catch(err => {
                mapLibsPromise = null;
                throw err;
            });
    }
    return mapLibsPromise;
}

// Time Attack: Countdown starten / pausieren / fortsetzen
function startTimeAttackTimer() {
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    const countdownEl = document.getElementById('quiz-timer-countdown');
    const runId = gameState.runId;
    gameState.timerInterval = setInterval(() => {
        if (runId !== gameState.runId) return;
        gameState.timeAttackSeconds--;
        if (countdownEl) countdownEl.textContent = Math.max(0, gameState.timeAttackSeconds);
        if (gameState.timeAttackSeconds <= 0) {
            clearInterval(gameState.timerInterval);
            gameState.timerInterval = null;
            endQuiz();
        }
    }, 1000);
}

function pauseTimeAttack() {
    if (gameState.activeMode === 'time-attack' && gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
        gameState.timeAttackPaused = true;
    }
}

function resumeTimeAttack() {
    if (gameState.activeMode === 'time-attack' && gameState.timeAttackPaused) {
        gameState.timeAttackPaused = false;
        startTimeAttackTimer();
    }
}

// Zeitabzug bei falscher Antwort im Time Attack
function applyTimePenalty() {
    gameState.timeAttackSeconds -= TIME_ATTACK_PENALTY;
    const countdownEl = document.getElementById('quiz-timer-countdown');
    if (countdownEl) countdownEl.textContent = Math.max(0, gameState.timeAttackSeconds);

    const box = document.getElementById('quiz-timer-box');
    if (box) {
        const flash = document.createElement('span');
        flash.className = 'time-penalty';
        flash.textContent = `−${TIME_ATTACK_PENALTY}s`;
        box.appendChild(flash);
        setTimeout(() => flash.remove(), 900);
    }

    if (gameState.timeAttackSeconds <= 0) {
        stopRunTimers();
        endQuiz();
        return true;
    }
    return false;
}

// Start Quiz Session
function startQuiz(levelId, mode = 'flag-to-name') {
    if (mode === 'endless' && endlessNeedsLogin()) {
        const info = 'Für den Endless-Modus brauchst du einen Account. Melde dich an oder registriere dich kostenlos.';
        if (window.FlaggenAuth && typeof window.FlaggenAuth.openAuth === 'function') {
            window.FlaggenAuth.openAuth('login', info);
        } else {
            // Rückfall: einfach den Login-Button oben "anklicken"
            const loginBtn = document.getElementById('btn-open-login');
            if (loginBtn) loginBtn.click();
        }
        return;
    }

    // Kartenmodus: erst die Kartendaten nachladen
    if (mode === 'map-mode' && !(window.renderCountryMap && window.WELT_TOPO)) {
        const startBtn = document.getElementById('btn-start-level');
        if (startBtn) {
            startBtn.disabled = true;
            startBtn.dataset.label = startBtn.innerHTML;
            startBtn.innerHTML = '⏳ Karte wird geladen …';
        }
        ensureMapLibs()
            .then(() => startQuiz(levelId, mode))
            .catch(() => alert('Die Karte konnte nicht geladen werden. Bitte lade die Seite neu.'))
            .finally(() => {
                if (startBtn) {
                    startBtn.disabled = false;
                    if (startBtn.dataset.label) startBtn.innerHTML = startBtn.dataset.label;
                }
            });
        return;
    }

    stopRunTimers();
    gameState.runId++;
    gameState.timeAttackPaused = false;
    gameState.activeLevel = levelId;
    gameState.activeMode = mode;

    let countryPool = [...levelsData[levelId].countries];
    if (mode === 'time-attack') {
        countryPool = Object.values(levelsData).flatMap(l => l.countries);
    } else if (mode === 'endless') {
        countryPool = [...ALL_WORLD_COUNTRIES];
    }

    gameState.questions = shuffleArray(countryPool);
    gameState.currentIndex = 0;
    gameState.score = 0;
    gameState.lives = mode === 'endless' ? 1 : 3;
    gameState.lastMissed = null;
    gameState.endlessRound = 1;
    gameState.isAnswerLocked = false;

    const timerBox = document.getElementById('quiz-timer-box');
    const livesContainer = document.getElementById('quiz-lives-container');
    const progressTrack = document.getElementById('quiz-progress-track-wrapper');

    if (mode === 'time-attack') {
        if (timerBox) timerBox.style.display = 'flex';
        if (livesContainer) livesContainer.style.display = 'none';
        if (progressTrack) progressTrack.style.display = 'none';

        gameState.timeAttackSeconds = 60;
        const countdownEl = document.getElementById('quiz-timer-countdown');
        if (countdownEl) countdownEl.textContent = gameState.timeAttackSeconds;
        startTimeAttackTimer();
    } else if (mode === 'endless') {
        if (timerBox) timerBox.style.display = 'none';
        if (livesContainer) livesContainer.style.display = 'none';
        if (progressTrack) progressTrack.style.display = 'block';
    } else {
        if (timerBox) timerBox.style.display = 'none';
        if (livesContainer) livesContainer.style.display = 'flex';
        if (progressTrack) progressTrack.style.display = 'block';
        updateLivesUI();
    }

    const stageFlag = document.getElementById('stage-flag-to-name');
    const stageName = document.getElementById('stage-name-to-flag');
    const stageMap = document.getElementById('stage-map-mode');

    if (stageFlag) stageFlag.style.display = 'none';
    if (stageName) stageName.style.display = 'none';
    if (stageMap) stageMap.style.display = 'none';

    if (mode === 'name-to-flag') {
        if (stageName) stageName.style.display = 'block';
    } else if (mode === 'map-mode') {
        if (stageMap) stageMap.style.display = 'block';
    } else {
        if (stageFlag) stageFlag.style.display = 'block';
    }

    navigateToView('quiz');
    loadNextQuestion();
}

// Load Next Question
function loadNextQuestion() {
    if (gameState.activeMode !== 'time-attack' && gameState.lives <= 0) {
        endQuiz();
        return;
    }

    if (gameState.currentIndex >= gameState.questions.length) {
        if (gameState.activeMode === 'time-attack' || gameState.activeMode === 'endless') {
            // Alle Länder durch -> neu mischen und weiter (letztes Land nicht direkt wiederholen)
            const last = gameState.questions[gameState.questions.length - 1];
            gameState.questions = shuffleArray(gameState.questions);
            if (gameState.questions.length > 1 && gameState.questions[0] === last) {
                [gameState.questions[0], gameState.questions[1]] = [gameState.questions[1], gameState.questions[0]];
            }
            gameState.currentIndex = 0;
            if (gameState.activeMode === 'endless') gameState.endlessRound = (gameState.endlessRound || 1) + 1;
        } else {
            endQuiz();
            return;
        }
    }

    gameState.isAnswerLocked = false;
    const currentCountry = gameState.questions[gameState.currentIndex];
    const total = gameState.questions.length;

    const counterEl = document.getElementById('quiz-question-counter');
    const runProgressEl = document.getElementById('quiz-run-progress');
    const levelIndicatorEl = document.getElementById('quiz-level-indicator');

    if (counterEl) {
        if (gameState.activeMode === 'time-attack') {
            counterEl.textContent = `Punkte: ${gameState.score}`;
        } else if (gameState.activeMode === 'endless') {
            const runde = gameState.endlessRound > 1 ? ` • Runde ${gameState.endlessRound}` : '';
            counterEl.textContent = `Score: ${gameState.score} • Rekord: ${getEndlessHighscore()}${runde}`;
        } else {
            counterEl.textContent = `Frage ${gameState.currentIndex + 1} / ${total}`;
        }
    }

    if (runProgressEl && gameState.activeMode !== 'time-attack') {
        const progressPct = (gameState.currentIndex / total) * 100;
        runProgressEl.style.width = `${progressPct}%`;
    }

    if (levelIndicatorEl) {
        const modeNames = {
            'flag-to-name': 'Klassisch',
            'name-to-flag': 'Umgedreht',
            'time-attack': 'Time Attack',
            'map-mode': 'Karten-Detektiv'
        };
        if (gameState.activeMode === 'endless') {
            levelIndicatorEl.textContent = '∞ Endless';
        } else if (gameState.activeMode === 'time-attack') {
            levelIndicatorEl.textContent = '⏱️ Time Attack • Alle Level';
        } else {
            levelIndicatorEl.textContent = `${levelsData[gameState.activeLevel].title} • ${modeNames[gameState.activeMode] || ''}`;
        }
    }

    let allLevelCountries = levelsData[gameState.activeLevel].countries;
    if (gameState.activeMode === 'time-attack') {
        allLevelCountries = Object.values(levelsData).flatMap(l => l.countries);
    } else if (gameState.activeMode === 'endless') {
        allLevelCountries = ALL_WORLD_COUNTRIES;
    }

    if (gameState.activeMode === 'name-to-flag') {
        const nameEl = document.getElementById('target-country-name');
        const hintEl = document.getElementById('hint-feedback-2');
        if (nameEl) nameEl.textContent = currentCountry.name;
        if (hintEl) hintEl.textContent = "Welche Flagge gehört dazu?";

        const options = generateOptions(currentCountry, allLevelCountries);
        renderFlagOptions(options, currentCountry);

    } else if (gameState.activeMode === 'map-mode') {
        const hintEl = document.getElementById('hint-feedback-3');
        if (hintEl) hintEl.textContent = "Welches Land ist auf der Karte markiert?";

        const mapBox = document.getElementById('map-outline-wrapper');
        if (mapBox && window.renderCountryMap) {
            window.renderCountryMap(mapBox, currentCountry.code);
        }

        const options = generateOptions(currentCountry, allLevelCountries);
        renderMapOptions(options, currentCountry);

    } else {
        const imgEl = document.getElementById('current-flag-img');
        const hintEl = document.getElementById('hint-feedback-1');
        if (hintEl) hintEl.textContent = "Wähle das richtige Land:";

        if (imgEl) {
            imgEl.style.opacity = '0';
            imgEl.src = `flags/${currentCountry.code}.svg`;
            imgEl.onload = () => { imgEl.style.opacity = '1'; };
        }

        const options = generateOptions(currentCountry, allLevelCountries);
        renderOptions(options, currentCountry);
    }
}

// Generate Options
function generateOptions(correctCountry, allCountries) {
    const options = [correctCountry];
    while (options.length < 4) {
        const rand = allCountries[Math.floor(Math.random() * allCountries.length)];
        if (!options.some(o => o.code === rand.code)) {
            options.push(rand);
        }
    }
    return shuffleArray(options);
}

// Render Classic Options
function renderOptions(options, correctCountry) {
    const container = document.getElementById('quiz-options-container');
    if (!container) return;

    container.innerHTML = '';
    options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.dataset.code = opt.code;
        const label = document.createElement('span');
        label.textContent = opt.name;
        btn.appendChild(label);
        addKeyHint(btn, i);
        btn.addEventListener('click', () => handleAnswer(opt, correctCountry, btn));
        container.appendChild(btn);
    });
}

// Render Flag Options
function renderFlagOptions(options, correctCountry) {
    const container = document.getElementById('flag-options-container');
    if (!container) return;

    container.innerHTML = '';
    options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'flag-opt-card';
        btn.dataset.code = opt.code;
        btn.innerHTML = `<img src="flags/${opt.code}.svg" alt="${opt.name}" loading="lazy">`;
        addKeyHint(btn, i);
        btn.addEventListener('click', () => handleAnswer(opt, correctCountry, btn));
        container.appendChild(btn);
    });
}

// Render Map Options
function renderMapOptions(options, correctCountry) {
    const container = document.getElementById('map-options-container');
    if (!container) return;

    container.innerHTML = '';
    options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.dataset.code = opt.code;
        const label = document.createElement('span');
        label.textContent = opt.name;
        btn.appendChild(label);
        addKeyHint(btn, i);
        btn.addEventListener('click', () => handleAnswer(opt, correctCountry, btn));
        container.appendChild(btn);
    });
}

// Handle Answer Selection
function handleAnswer(selectedOpt, correctCountry, clickedElement) {
    if (gameState.isAnswerLocked) return;
    gameState.isAnswerLocked = true;

    const isCorrect = selectedOpt.code === correctCountry.code;

    if (isCorrect) {
        playSound('correct');
        gameState.score++;
        if (clickedElement) clickedElement.classList.add('correct');
    } else {
        playSound('incorrect');
        if (clickedElement) clickedElement.classList.add('incorrect');

        if (gameState.activeMode === 'time-attack') {
            if (applyTimePenalty()) return;
        } else {
            gameState.lives--;
            updateLivesUI();
        }

        document.querySelectorAll('.quiz-opt-btn, .flag-opt-card').forEach(el => {
            if (el.dataset.code === correctCountry.code) el.classList.add('correct');
        });

        vibrate(200);
        gameState.lastMissed = correctCountry;
    }

    document.querySelectorAll('.quiz-opt-btn, .flag-opt-card').forEach(el => el.disabled = true);

    // Time Attack: ohne Wartezeit weiter (die Zeit läuft ja). Sonst je nach Tempo-Einstellung.
    const delay = gameState.activeMode === 'time-attack' ? 0 : (TEMPO_MS[settings.tempo] || 1200);
    const runId = gameState.runId;
    const next = () => {
        gameState.answerTimeout = null;
        // Wurde die Runde inzwischen abgebrochen oder neu gestartet? Dann nichts tun.
        if (runId !== gameState.runId || gameState.currentView !== 'quiz') return;
        gameState.currentIndex++;
        loadNextQuestion();
    };
    if (delay === 0) next(); else gameState.answerTimeout = setTimeout(next, delay);
}

// Update Lives UI
function updateLivesUI() {
    for (let i = 1; i <= 3; i++) {
        const heart = document.getElementById(`heart-${i}`);
        if (heart) {
            if (i <= gameState.lives) {
                heart.classList.add('active');
                heart.style.opacity = '1';
            } else {
                heart.classList.remove('active');
                heart.style.opacity = '0.3';
            }
        }
    }
}

// End Quiz
function endQuiz() {
    stopRunTimers();

    if (gameState.activeMode === 'endless') {
        endEndless();
        return;
    }

    const recordLabelEl = document.getElementById('result-record-label');
    if (recordLabelEl) recordLabelEl.textContent = '🏆 Gesamtfortschritt (Level):';
    const rankNoteEl = document.getElementById('result-rank-note');
    if (rankNoteEl) rankNoteEl.style.display = 'none';

    const levelId = gameState.activeLevel;
    const mode = gameState.activeMode;
    const total = mode === 'time-attack' ? gameState.score : gameState.questions.length;
    const score = gameState.score;
    const stats = saveLevelStats(levelId, mode, score, total);

    updateAllHomePreviews();
    playSound('win');

    const iconEl = document.getElementById('result-status-icon');
    const titleEl = document.getElementById('result-status-title');
    const subtitleEl = document.getElementById('result-status-subtitle');
    const scoreTextEl = document.getElementById('result-score-text');
    const barEl = document.getElementById('result-progress-bar');
    const percentBadgeEl = document.getElementById('result-percent-badge');
    const recordTextEl = document.getElementById('result-record-text');
    const recordContainer = document.getElementById('result-record-container');
    const progressTrackBox = document.getElementById('result-progress-track-box');

    const percent = mode === 'time-attack' ? 100 : Math.round((score / total) * 100);

    if (mode === 'time-attack') {
        if (iconEl) iconEl.textContent = '⏱️';
        const isNewBest = saveTimeAttackBest(score);
        if (titleEl) titleEl.textContent = isNewBest ? 'Neuer Time-Attack-Rekord!' : 'Time Attack beendet!';
        if (subtitleEl) subtitleEl.textContent = `Du hast ${score} ${score === 1 ? 'Flagge' : 'Flaggen'} richtig erkannt. Jede falsche Antwort kostet ${TIME_ATTACK_PENALTY} Sekunden.`;
        if (scoreTextEl) scoreTextEl.textContent = `${score} Flaggen`;
        if (recordLabelEl) recordLabelEl.textContent = '🏆 Dein Rekord:';
        if (recordTextEl) recordTextEl.textContent = `${getTimeAttackBest()} Flaggen`;
        if (recordContainer) recordContainer.style.display = 'flex';
        if (progressTrackBox) progressTrackBox.style.display = 'none';
        if (percentBadgeEl) percentBadgeEl.textContent = '🔥';
    } else {
        if (iconEl) iconEl.textContent = gameState.lives > 0 ? (percent >= 50 ? '🎉' : '👍') : '💔';
        if (titleEl) titleEl.textContent = levelsData[levelId].title;
        if (subtitleEl) {
            subtitleEl.textContent = gameState.lives <= 0 ? "Keine Leben mehr übrig!" : "Quiz erfolgreich beendet!";
        }
        if (scoreTextEl) scoreTextEl.textContent = `${score} / ${total}`;
        if (barEl) barEl.style.width = `${stats.bestPercent}%`;
        if (percentBadgeEl) percentBadgeEl.textContent = `${percent}%`;
        if (recordTextEl) recordTextEl.textContent = `${stats.bestPercent}% Gesamtfortschritt`;
        if (recordContainer) recordContainer.style.display = 'flex';
        if (progressTrackBox) progressTrackBox.style.display = 'block';
    }

    navigateToView('result');
}

// Endless beendet: Highscore speichern und Ergebnis anzeigen
function endEndless() {
    const score = gameState.score;
    const total = ALL_WORLD_COUNTRIES.length;
    const runden = Math.floor(score / total); // wie oft alle 195 Länder geschafft
    const isNewRecord = saveEndlessHighscore(score);
    const highscore = getEndlessHighscore();

    updateAllHomePreviews();
    if (isNewRecord) playSound('win');

    const set = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    let icon = '💀';
    let title = 'Game Over';
    let subtitle = `Du hast ${score} ${score === 1 ? 'Land' : 'Länder'} am Stück richtig erkannt.`;
    if (runden >= 1) {
        subtitle += ` Du hast alle ${total} Länder ${runden === 1 ? 'einmal' : runden + '-mal'} ohne Fehler geschafft! 👑`;
    }
    if (gameState.lastMissed) {
        subtitle += ` Die gesuchte Flagge war: ${gameState.lastMissed.name}.`;
    }
    if (isNewRecord) {
        icon = '🏆';
        title = 'Neuer Highscore!';
    }

    set('result-status-icon', icon);
    set('result-status-title', title);
    set('result-status-subtitle', subtitle);
    set('result-score-text', `${score} Punkte`);
    set('result-percent-badge', `${score}`);
    set('result-record-label', '🏆 Highscore:');
    set('result-record-text', `${highscore}`);

    const barEl = document.getElementById('result-progress-bar');
    // Balken zeigt den Fortschritt durch die aktuelle 195er-Runde
    if (barEl) barEl.style.width = `${score >= total && score % total === 0 ? 100 : ((score % total) / total) * 100}%`;
    const recordContainer = document.getElementById('result-record-container');
    if (recordContainer) recordContainer.style.display = 'flex';
    const progressTrackBox = document.getElementById('result-progress-track-box');
    if (progressTrackBox) progressTrackBox.style.display = 'block';

    // Platz in der Rangliste anzeigen (und Score speichern, falls eingeloggt)
    const rankNote = document.getElementById('result-rank-note');
    if (rankNote) {
        rankNote.style.display = 'none';
        if (window.FlaggenRangliste) window.FlaggenRangliste.ergebnisAnzeigen(score, rankNote);
    }

    navigateToView('result');
}

// Modals
function openModal(modalId) {
    playSound('click');
    const overlay = document.getElementById('modal-overlay');
    const dialog = document.getElementById(modalId);

    if (overlay) overlay.classList.add('active');
    document.querySelectorAll('.modal-dialog').forEach(d => d.classList.remove('active'));
    if (dialog) dialog.classList.add('active');
}

function closeAllModals() {
    playSound('click');
    const quitDialog = document.getElementById('modal-quit');
    const wasQuitDialog = quitDialog && quitDialog.classList.contains('active');
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('active');
    document.querySelectorAll('.modal-dialog').forEach(d => d.classList.remove('active'));
    if (wasQuitDialog && gameState.currentView === 'quiz') resumeTimeAttack();
}

// Shuffle Array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
