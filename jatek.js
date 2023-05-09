document.addEventListener("DOMContentLoaded", function(event) {

    const ko_div = document.getElementById('ko');
    const papir_div = document.getElementById('papir');
    const ollo_div = document.getElementById('ollo');
    const eredmeny_div = document.querySelector('.eredmeny');
    const felhasznalo_pont = document.getElementById('felhasznalo-pont');
    const dontetlen_pont = document.getElementById('dontetlen-pont');
    const szamitogep_pont = document.getElementById('szamitogep-pont');
    const ujrainditas_div = document.getElementById('ujrainditas-div');
    const ujrainditas_gomb = document.getElementById('ujrainditas');
    let felhasznalo_score = 0;
    let szamitogep_score = 0;
    let dontetlen_score = 0;

    function ertekeles(felhasznalo) {
        var szamitogep = szamitogepvalaszt();
        switch(felhasznalo + szamitogep) {
            case 'koollo':
            case 'papirko':
            case 'ollopapir':
                nyert(felhasznalo, szamitogep);
                break;
            case 'koko':
            case 'papirpapir':
            case 'olloollo':
                dontetlen(felhasznalo, szamitogep);
                break;
            case 'olloko':
            case 'kopapir':
            case 'papirollo':
                vesztett(felhasznalo, szamitogep);
                break;
        }
    }


    function valasztas(ertek) {
        if (ertek === "ko") {
            ertekeles('ko');
        }
        else if (ertek === "papir") {
            ertekeles('papir');
        }
        else if (ertek === "ollo") {
            ertekeles('ollo');
        }
    }

    function nyert(felhasznalo, szamitogep) {
        felhasznalo_score++;
        eredmeny_div.innerHTML = nevKonvert(felhasznalo)+ " nyert "+nevKonvert(szamitogep)+" ellen!"
        felhasznalo_pont.innerHTML = felhasznalo_score;
        document.getElementById(felhasznalo).classList.add('nyert');
        setTimeout(() => document.getElementById(felhasznalo).classList.remove('nyert'), 300)
    }

    function dontetlen(felhasznalo, szamitogep) {
        dontetlen_score++;
        eredmeny_div.innerHTML = nevKonvert(felhasznalo)+ " és "+nevKonvert(szamitogep)+" megegyezik, döntetlen!"
        dontetlen_pont.innerHTML = dontetlen_score;
        document.getElementById(felhasznalo).classList.add('dontetlen');
        setTimeout(() => document.getElementById(felhasznalo).classList.remove('dontetlen'), 300)
    }

    function vesztett(felhasznalo, szamitogep) {
        szamitogep_score++;
        eredmeny_div.innerHTML = nevKonvert(felhasznalo)+ " vesztett "+nevKonvert(szamitogep)+" ellen!"
        szamitogep_pont.innerHTML = szamitogep_score;
        document.getElementById(felhasznalo).classList.add('vesztett');
        setTimeout(() => document.getElementById(felhasznalo).classList.remove('vesztett'), 300)
    }

    function nevKonvert(ertek) {
        if (ertek === 'ko') {
            return "Kő";
        }
        else if (ertek === 'papir') {
            return "Papír";
        }
        else {
            return "Olló";
        }
    }

    function eredmenyEllenorzes() {
        if (felhasznalo_score >= 10) {
            eredmeny_div.innerHTML = "A felhasználó nyert! Gratulálok! Az újraindításhoz kattints az 'Újraindítás' gombra!"
            ko_div.outerHTML = ko_div.outerHTML;
            papir_div.outerHTML = papir_div.outerHTML;
            ollo_div.outerHTML = ollo_div.outerHTML;
            ujrainditas_div.classList.remove('nemlathato');
            ujrainditas_div.classList.add('lathato');
            ujrainditas_gomb.addEventListener('click', () => location.reload());
        } else if (szamitogep_score >= 10) {
            eredmeny_div.innerHTML = "A számítógép nyert! Az újraindításhoz kattints az 'Újraindítás' gombra!"
            ko_div.outerHTML = ko_div.outerHTML;
            papir_div.outerHTML = papir_div.outerHTML;
            ollo_div.outerHTML = ollo_div.outerHTML;
            ujrainditas_div.classList.remove('nemlathato');
            ujrainditas_div.classList.add('lathato');
            ujrainditas_gomb.addEventListener('click', () => location.reload());
        }
    };
    setInterval(eredmenyEllenorzes, 100);

    function szamitogepvalaszt() {
        let szam = Math.floor(Math.random() * 3);
        var valaszok = ["ko", "papir", "ollo"]
        return valaszok[szam];
    }

    function load() {
        ko_div.addEventListener('click', () => valasztas('ko'));
        papir_div.addEventListener('click', () => valasztas('papir'));
        ollo_div.addEventListener('click', () => valasztas('ollo'));
    }
    load();
});