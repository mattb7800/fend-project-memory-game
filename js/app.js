/*
 * Create a list that holds all of your cards
This list holds all the card types defined in the HTML
 */
const cardsAll = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o"
"fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube",
"fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle",
"fa fa-bomb", "fa fa-bomb"];





/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */






/* count moves */
const totalMoves = 0;
const moveCount = document.querySelector('.moves');
const levelStars = document.querySelector('.stars');

function moves () {
  totalMoves++;
  moveCount. innerHTML = totalMoves;

  /*star ratings
  min number of moves = 8 */

  if (totalMoves > 10  && moves <= 20) {
      document.getElementById('SuperStar').style.color = "white";
  } else if (totalMoves <= 30) {
    document.getElementById('champ').style.color = "white"
  }

};










/*set up for game clock*/
const gameClock = document.querySelector('.clock');
let minutes = document.getElementById('mins');
let seconds = document.getElementById('secs');
let sixtySeconds = 0;

/* start clock */
/*info on setInterval method found at
https://www.w3schools.com/jsref/met_win_setinterval.asp */

function startClock() {
    elapsedTime = setInterval(function() {
      seconds.innerText++
      if (seconds.innerText == 60) {
        minutes.innerText++;
        seconds.innerText = 0;
      }
    }, 1000);
}

/*info on clearInterval method found at
https://www.w3schools.com/jsref/met_win_clearinterval.asp*/
function restartGameClock() {
  clearInterval(gameCLock);
}

document.querySelector(".restart").addEventListener('click', restartGameClock);
