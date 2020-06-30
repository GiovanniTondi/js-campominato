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

// generare 16 numeri casuali
var numEsplosivi = [];

while (numEsplosivi.length < howManyRand) {
    var numRandom = getRandomIntInclusive(1, maxNum);
    if (!isInArray(numEsplosivi, numRandom)) {
        numEsplosivi.push(numRandom);
    }
}

console.log(numEsplosivi);

// Chiedere numeri all'utente
var numUser = [];
var mina = false;
while (numUser.length + numEsplosivi.length < maxNum && !mina) {
    var num = parseInt(prompt("Inserisci un numero!"));
    // controllo
    if ((isInArray(numUser, num)) || (!isInRange(num, 1, maxNum))) {
        alert("Numero già inserito o fuori range");
    } else if (isInArray(numEsplosivi, num)) {
        mina = true;
        console.log("Boom!!");
    } else {
        numUser.push(num);
    }
}
console.log(numUser);

// punteggio
if (mina) {
    var messaggio = "Peccato, hai perso dopo " + numUser.length + " mosse!";
} else {
    var messaggio = "Complimenti, hai vinto con " + numUser.length + " mosse!";
}

console.log(messaggio);



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
