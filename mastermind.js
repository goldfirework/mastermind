function onStart() {
    var div = document.getElementById("mastermind-gjetter-velger");
    for (var i = 0; i < 4; i++) {
        div.innerHTML += '<div class="Mastermind gjetter fargeGjett" id="mastermind-gjetter-velger-' + i + '" onclick="endreFarge(' + i + ')"></div>';
    }

    div.innerHTML += '<div class="Mastermind gjetter" id="mastermind-gjetter-velger-gjett"><button class="Mastermind gjetter" id="mastermind-gjetter-velger-gjett-knapp" onclick="gjett()">Gjett</button></div>';


    var div = document.getElementById("mastermind-gjetta");

    for (var i = 0; i < 10; i++) {
        div.innerHTML += '<div class="Mastermind gjetta gjettDiv" id="mastermind-gjett-' + i + '"></div>';

        var div2 = document.getElementById("mastermind-gjett-" + i);
        for (var j = 0; j < 4; j++) {
            div2.innerHTML += '<div class="Mastermind gjetta gjettaFarge fargeGjett" id="mastermind-gjett-' + i + '-farge-' + j + '"></div>';
        }

        div2.innerHTML += '<div class="Mastermind gjetta tilbakemelding tilbakemeldingOuter" id="gjett' + i + '-tilbakemelding"></div>';
        var div3 = document.getElementById("gjett" + i + "-tilbakemelding");
        for (var j = 0; j < 4; j++) {
            if(j == 1 || j == 3) {
                div3.innerHTML += '<div class="Mastermind gjetta tilbakemelding tilbakemeldingInner tilbakemeldingHoyre" id="gjett' + i + '-tilbakemelding-' + j + '"></div>';
            } else {
                div3.innerHTML += '<div class="Mastermind gjetta tilbakemelding tilbakemeldingInner tilbakemeldingVenstre" id="gjett' + i + '-tilbakemelding-' + j + '"></div>';
            }
        }
    }

}

onStart()

//alle fargene det kan være.
const farger = ["green", "red", "blue", "yellow", "purple", "orange"]

//et map for å lagre hvor mange ganger man har klikka.
const naaFarger = new Map([
    [0, -1],
    [1, -1],
    [2, -1],
    [3, -1]
]);

//lager variabel for riktige farger.
const riktigFarger = [farger[Math.floor(Math.random() * farger.length)], farger[Math.floor(Math.random() * farger.length)], farger[Math.floor(Math.random() * farger.length)], farger[Math.floor(Math.random() * farger.length)]];

//printer riktige farger. NB! fjern etter testing.
console.log(riktigFarger);

//funksjonen som blir kalt for å endre fargen når man klikker
function endreFarge(tall) {
    //Øker antall ganer man har klikka med 1.
    naaFarger.set(tall, (naaFarger.get(tall) + 1));

    //sjekker om man har klikket på den nok ganger til at det ikke er mer farger. Setter den tilbake til 0 dersom det er sant.
    if (naaFarger.get(tall) >= farger.length) {
        naaFarger.set(tall, 0);
    }

    //skifter farge på den man klikket på til neste i listen.
    document.getElementById("mastermind-gjetter-velger-" + tall).style.backgroundColor = farger[naaFarger.get(tall)];
}


//variabel som lagrer hvor mange ganger man har klikka gjett.
var runde = -1;

//funkjsonen som blir kalt når man klikker gjett.
function gjett() {

    //en variabel som lagrer de fargenene det er nå-
    var gjettetFarger = [farger[naaFarger.get(0)], farger[naaFarger.get(1)], farger[naaFarger.get(2)], farger[naaFarger.get(3)]];

    //passer på at brukeren har valgt alle 4 fargene, og at ingen av de står tomme.
    if(!gjettetFarger.includes(undefined)) {
        
        //legger til en på runde :)
        runde = runde + 1;

        //lager variabel fargerIgjen
        var fargerIgjen = []

        //flytter fargene ned.
        for(var i = 0; i<4; i++) {
            console.log(gjettetFarger[i]);
            document.getElementById("mastermind-gjett-" + runde + "-farge-"+i).style.backgroundColor = gjettetFarger[i];
        }

        //legger til fargene i fargerIgjen, hvis den er på riktig plass erstattes det med "RiktigFarge."
        //i tilegg gjør det at fargen som var på riktig plass blir markert som "brukt" så den ikke brukes igjen :)
        var i = -1;
        riktigFarger.slice().forEach(function (farge) {
            i++;
            fargerIgjen[i] = farge.replace(gjettetFarger[i], "RiktigFarge");
            
            if(fargerIgjen[i] == "RiktigFarge") {
                gjettetFarger[i] = "brukt";
            }
        });
    
        //Sjekker om noen farger er på feil plass.
        //dersom det er det, blir fargen markert som "FeilPlass" og fargen "brukt".
        for(var i = 0; i < 4; i++) {
            while(fargerIgjen.includes(gjettetFarger[i])) {
                fargerIgjen[fargerIgjen.indexOf(gjettetFarger[i])] = "FeilPlass"
                gjettetFarger[i] = "brukt";
            }
        }

        //legger inn tilbakemeldingene. Grønn er riktig farge på riktig plass. Gul er riktig farge feil plass.
        i = 0;
        fargerIgjen.forEach(function (x) {
            if(x == "RiktigFarge") {
                document.getElementById("gjett" + runde + "-tilbakemelding-" + i).style.backgroundColor = "green";
                i++;
            } else if(x == "FeilPlass") {
                document.getElementById("gjett" + runde + "-tilbakemelding-" + i).style.backgroundColor = "yellow";
                i++;
            }
        });

        if(fargerIgjen[0] == "RiktigFarge" && fargerIgjen[1] == "RiktigFarge" && fargerIgjen[2] == "RiktigFarge" && fargerIgjen[3] == "RiktigFarge") {
            alert("Du vant!")
            runde = 0;
            location.reload(true);
        }

        if(runde >= 9) {
            alert("Du tapte!")
            location.reload(true);
        }

    } else {
        alert("Du må velge 4 forskjellige farger, grå er ikke et valg!")
    }
}