/*Create a list that holds all of your cards
This list holds all the card types defined in the HTML
Need 2 of each type of card.*/
const cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
"fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle","fa fa-diamond",
"fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle",
"fa fa-paper-plane-o", "fa fa-cube"];

/* Returns HTML for cards */
  function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}


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

function initGame() {
  startTimer();
  let deck = document.querySelector('.deck');
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });

 deck.innerHTML = cardHTML.join('');

 let allCards = document.querySelectorAll('.card');
 let openCards = [];

/*Info on using classList property found at
https://www.w3schools.com/jsref/prop_element_classlist.asp */

allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {
    if (
      !card.classList.contains('open') &&
      !card.classList.contains('show') &&
      !card.classList.contains('match')
    ) {
      openCards.push(card);
      card.classList.add('open', 'show');

      if (openCards.length == 2) {
        moveCount();
/* Info on using dataset property found at
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset */

        /*selected cards match = yes */

        if (openCards[0].dataset.card == openCards[1].dataset.card) {

         openCards[0].classList.add('match');
         openCards[0].classList.add('open');
         openCards[0].classList.add('show');

         openCards[1].classList.add('match');
         openCards[1].classList.add('open');
         openCards[1].classList.add('show');

         openCards = [];

         winGame();

       } else {
         setTimeout(function() {
           openCards.forEach(function(card) {
             card.classList.remove('open', 'show');
           });
           openCards = [];
         }, 700);
      }
     }
    }
  });
});
}

/* count moves */
let moves = 0;
let moveCounter = document.querySelector('.moves');
let stars = document.querySelector('.stars');
let one = document.querySelector('.one');
let two = document.querySelector('.two');
let three = document.querySelector('.three');

function moveCount() {
  moves++;
  moveCounter.innerHTML = moves;

  /*star ratings -- min number of moves = 8 */

  if (moves > 10  && moves <= 15) {
      one.style.display = "none";
  } else if (moves > 20){
    two.style.display = "none";
  }
}

/*set up for game clock*/
/* info on setInterval method found at
https://www.w3schools.com/jsref/met_win_setinterval.asp */

let timer = document.querySelector('.timer');
var timing;
let second = 0;


function startTimer() {

  timing = window.setInterval(function() {
  timer.innerHTML = second + " seconds";
  second++;
  }, 1000);
}

/*info on clearInterval method found at
https://www.w3schools.com/jsref/met_win_clearinterval.asp*/

function resetTimer() {
  clearInterval(timing);
  second = 0;
  timer.innerHTML = 0;


//  console.log(timer); //

}

document.querySelector('.restart').addEventListener('click', resetTimer);

/* JS for Modal */
/* modal info found at https://www.w3schools.com/w3css/w3css_modal.asp */

let matchedCards = document.getElementsByClassName('match');
let modal = document.querySelector('.modal');
let totalTime = document.querySelector('.totalTime');
let starRating = document.querySelector('.starRating');
let totalMoves =  document.querySelector('.totalMoves');

function winGame() {
  if (matchedCards.length === 16) {
    modal.style.display = "block";
    totalMoves.innerHTML = moveCounter.innerHTML;
    totalTime.innerHTML = timer.innerHTML;
    starRating.innerHTML = stars.innerHTML;


  }

}

let span = document.getElementsByClassName("close")[0];
// modal will close when x is clicked //
span.onclick = function() {
    modal.style.display = "none";

  };

//close modal when user clicks outside of modal //
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  };
document.querySelector('.button').addEventListener('click', playAgain);
document.querySelector('.button').addEventListener('click', resetTimer);
document.querySelector('.restart').addEventListener('click', playAgain);

function playAgain() {
  modal.style.display = "none";
  moves = 0;
  moveCounter.innerHTML = 0;
  one.style.display = 'inline-block';
  two.style.display = 'inline-block';
  three.style.display = 'inline-block';
}

initGame();
