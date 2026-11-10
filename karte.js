/**
 * Flaggen-Raten.de - Karten-Detektiv
 * Zeichnet einen Weltkarten-Ausschnitt, auf dem das gesuchte Land markiert ist.
 * Benötigt: lib/d3-array.min.js, lib/d3-geo.min.js, lib/topojson-client.min.js, lib/weltkarte-daten.js
 */
(function () {
    // ISO-Ländercode (wie in script.js) -> numerische ID in den Kartendaten
    const LAND_IDS = {"af":"004","eg":"818","al":"008","dz":"012","ad":"020","ao":"024","ag":"028","gq":"226","ar":"032","am":"051","az":"031","et":"231","au":"036","bs":"044","bh":"048","bd":"050","bb":"052","by":"112","be":"056","bz":"084","bj":"204","bt":"064","bo":"068","ba":"070","bw":"072","br":"076","bn":"096","bg":"100","bf":"854","bi":"108","cl":"152","cn":"156","cr":"188","dk":"208","cd":"180","de":"276","dm":"212","do":"214","dj":"262","ec":"218","sv":"222","ci":"384","er":"232","ee":"233","sz":"748","fj":"242","fi":"246","fr":"250","ga":"266","gm":"270","ge":"268","gh":"288","gd":"308","gr":"300","gt":"320","gn":"324","gw":"624","gy":"328","ht":"332","hn":"340","in":"356","id":"360","iq":"368","ir":"364","ie":"372","is":"352","il":"376","it":"380","jm":"388","jp":"392","ye":"887","jo":"400","kh":"116","cm":"120","ca":"124","cv":"132","kz":"398","qa":"634","ke":"404","kg":"417","ki":"296","co":"170","km":"174","hr":"191","cu":"192","kw":"414","la":"418","ls":"426","lv":"428","lb":"422","lr":"430","ly":"434","li":"438","lt":"440","lu":"442","mg":"450","mw":"454","my":"458","mv":"462","ml":"466","mt":"470","ma":"504","mh":"584","mr":"478","mu":"480","mx":"484","fm":"583","md":"498","mc":"492","mn":"496","me":"499","mz":"508","mm":"104","na":"516","nr":"520","np":"524","nz":"554","ni":"558","nl":"528","ne":"562","ng":"566","kp":"408","mk":"807","no":"578","om":"512","at":"040","tl":"626","pk":"586","ps":"275","pw":"585","pa":"591","pg":"598","py":"600","pe":"604","ph":"608","pl":"616","pt":"620","cg":"178","rw":"646","ro":"642","ru":"643","sb":"090","zm":"894","ws":"882","sm":"674","st":"678","sa":"682","se":"752","ch":"756","sn":"686","rs":"688","sc":"690","sl":"694","zw":"716","sg":"702","sk":"703","si":"705","so":"706","es":"724","lk":"144","kn":"659","lc":"662","vc":"670","za":"710","sd":"729","kr":"410","ss":"728","sr":"740","sy":"760","tj":"762","tz":"834","th":"764","tg":"768","to":"776","tt":"780","td":"148","cz":"203","tn":"788","tr":"792","tm":"795","tv":"798","ug":"800","ua":"804","hu":"348","uy":"858","us":"840","uz":"860","vu":"548","va":"336","ve":"862","ae":"784","gb":"826","vn":"704","cf":"140","cy":"196"};

    // Länder, die in den Kartendaten fehlen (zu klein): [Längengrad, Breitengrad]
    const PUNKTE = { tv: [179.2, -8.5] };

    const BREITE = 600;
    const HOEHE = 340;
    const ERDRADIUS_KM = 6371;
    const MIN_AUSSCHNITT_KM = 1800; // so viel Umgebung wird mindestens gezeigt

    let laender = null;

    function ladeLaender() {
        if (laender) return laender;
        if (typeof topojson === 'undefined' || typeof WELT_TOPO === 'undefined') return null;
        laender = topojson.feature(WELT_TOPO, WELT_TOPO.objects.countries).features;
        return laender;
    }

    // Hauptteile eines Landes (ohne weit entfernte kleine Inseln/Überseegebiete)
    function hauptteile(feature) {
        const g = feature.geometry;
        if (g.type !== 'MultiPolygon') return feature;
        const teile = g.coordinates.map(c => ({ c, a: d3.geoArea({ type: 'Polygon', coordinates: c }) }));
        const groesste = Math.max(...teile.map(t => t.a));
        return {
            type: 'Feature',
            geometry: { type: 'MultiPolygon', coordinates: teile.filter(t => t.a >= groesste * 0.3).map(t => t.c) }
        };
    }

    function baueSvg(code) {
        const alle = ladeLaender();
        if (!alle) return null;
        const ziel = alle.find(f => f.id === LAND_IDS[code]) || null;
        if (!ziel && !PUNKTE[code]) return null;

        const kern = ziel ? hauptteile(ziel) : null;
        const [lon, lat] = kern ? d3.geoCentroid(kern) : PUNKTE[code];

        const projektion = d3.geoAzimuthalEqualArea().rotate([-lon, -lat]);
        const maxSkala = BREITE * ERDRADIUS_KM / MIN_AUSSCHNITT_KM;
        if (kern) {
            projektion.fitExtent([[BREITE * 0.3, HOEHE * 0.25], [BREITE * 0.7, HOEHE * 0.75]], kern);
        } else {
            projektion.scale(maxSkala);
        }

        // Bei kleinen Ländern weiter rauszoomen, damit man die Umgebung erkennt
        if (projektion.scale() > maxSkala) {
            projektion.scale(maxSkala);
        }
        projektion.translate([BREITE / 2, HOEHE / 2]);
        projektion.clipExtent([[-5, -5], [BREITE + 5, HOEHE + 5]]);

        const pfad = d3.geoPath(projektion).digits(1);
        let inhalt = `<rect class="karte-meer" width="${BREITE}" height="${HOEHE}"/>`;
        for (const f of alle) {
            if (f === ziel) continue;
            const d = pfad(f);
            if (d) inhalt += `<path class="karte-land" d="${d}"/>`;
        }
        if (ziel) inhalt += `<path class="karte-ziel" d="${pfad(ziel)}"/>`;

        // Sehr kleine Länder zusätzlich mit einem Kreis markieren
        let klein = true;
        if (kern) {
            const [[x0, y0], [x1, y1]] = pfad.bounds(kern);
            klein = Math.max(x1 - x0, y1 - y0) < 30;
        }
        if (klein) {
            const [cx, cy] = projektion([lon, lat]);
            inhalt += `<circle class="karte-kreis" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="16"/>`;
        }

        return `<svg class="karte-svg" viewBox="0 0 ${BREITE} ${HOEHE}" role="img" aria-label="Kartenausschnitt mit markiertem Land">${inhalt}</svg>`;
    }

    window.renderCountryMap = function (container, code) {
        const svg = baueSvg(code);
        container.innerHTML = svg || '<p class="karte-fehler">Karte konnte nicht geladen werden.</p>';
    };

    // Für Tests in Node
    if (typeof module !== 'undefined') module.exports = { baueSvg };
})();
