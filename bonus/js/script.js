/*
    Il computer deve generare 16 numeri casuali tra 1 e 100.
    I numeri non possono essere duplicati
    In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
    L’utente non può inserire più volte lo stesso numero.
    Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
    La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
    Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
    BONUS: (da fare solo se funziona tutto il resto)
    all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
    con difficoltà 0 => tra 1 e 100
    con difficoltà 1 =>  tra 1 e 80
    con difficoltà 2 => tra 1 e 50
*/

var maxNum = 100;
var howManyRand = 16;
var numEsplosivi = [];
var btnAdd = document.getElementById('btnAdd');
var btnPlay = document.getElementById('btnPlay');
var errore = 0;

btnPlay.addEventListener("click", function () {

    if (errore) {
        document.getElementById('menu').className = "hidden";
        document.getElementById('container').classList.remove("opacity");
    } else {

        var difficolta = parseInt(document.getElementById('difficolta').value);

        switch (difficolta) {
            case 0:
                maxNum = 100;
                break;
            case 1:
                maxNum = 80;
                break;
            case 2:
                maxNum = 50;
                break;
        }

        document.getElementById('menu').className = "hidden";
        document.getElementById('container').classList.remove("hidden");
        var campo = document.getElementById('campo');

        for (var i = 0; i < maxNum; i++) {
            campo.innerHTML += '<div id="num'+ i +'" class="cella">'+ (i+1) +'</div>';
        }


        while (numEsplosivi.length < howManyRand) {
            var numRandom = getRandomIntInclusive(1, maxNum);
            if (!isInArray(numEsplosivi, numRandom)) {
                numEsplosivi.push(numRandom);
                var id = "num" + (numRandom - 1);
            }
        }
        console.log(numEsplosivi);
    }
});


var numUser = [];
var mina = false;
btnAdd.addEventListener("click", function () {

    var num = parseInt(document.getElementById('number').value);
    // controllo
    if ((isInArray(numUser, num)) || (!isInRange(num, 1, maxNum))) {
        // alert("Numero già inserito o fuori range");
        document.getElementById('menu').classList.remove("hidden");
        document.getElementById('container').classList.add("opacity");
        errore = 1;
        document.getElementById('titolo_messaggio').innerHTML = "ERRORE!";
        document.getElementById('message').innerHTML = "Numero già inserito o fuori range";
        btnPlay.innerHTML = "Continua";

    } else if (isInArray(numEsplosivi, num)) {
        mina = true;
        console.log("Boom!!");
        btnAdd.disabled = true;
        for (var i = 0; i < numEsplosivi.length; i++) {
        var id = "num" + (numEsplosivi[i]-1);
            document.getElementById(id).classList.add('mine');
            document.getElementById('container').classList.add('esplosione');
        }
    } else {
        numUser.push(num);
        var id = "num" + (num - 1);
        document.getElementById('score').innerHTML = numUser.length;
        document.getElementById(id).classList.add("safe");
        if (numUser.length + numEsplosivi.length == maxNum) {
            console.log("hai vinto");
        }
    }
});



// Funzioni
function isInArray(array, val) {
    var i = 0;
    while (i < array.length) {
        if (array[i] == val) {
            return true;
        }
        i++;
    }
    return false;
}

function isInRange(num, min, max) {
    if (num >= min && num <= max) {
        return true;
    }
    return false;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
}
