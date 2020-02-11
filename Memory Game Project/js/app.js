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



// a list that holds all of the cards

const cardsIcons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
  "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf",
  "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"
];

const myContainer = document.querySelector(".deck");
let openCards = [];
let matchedCards = [];


//intialize game
function init() {

  // shuffle the cards icons
  let shuffIcons = shuffle(cardsIcons);
  for (let i = 0; i < shuffIcons.length; i++) {
    //create the list of cards
    const myCards = document.createElement('li');
    myCards.classList.add("card");
    myCards.innerHTML = `<i class="${cardsIcons[i]}"></i>`;
    myContainer.appendChild(myCards);

    //click function
    myCards.addEventListener("click", function() {
      let isFirstClick = true;
      if (isFirstClick) {
        // Start the timer
        startTimer();
        // Change indicator's value for first Click
        isFirstClick = false;
      }

      const currentCard = this;
      const previousCard = openCards[0];
      //  an existing opened card
      if (openCards.length === 1) {

        myCards.classList.add("open", "show", "disabled");
        openCards.push(this);
        //compare two opened cards if matched

        if (currentCard.innerHTML === previousCard.innerHTML) {
          //matched
          currentCard.classList.add("match");
          previousCard.classList.add("match");
          matchedCards.push(currentCard, previousCard);
          openCards = [];

          //  gameOver();

        } else {
          // Wait 1000ms then do this
          setTimeout(function() {
            currentCard.classList.remove('open', 'show', 'disabled');
            previousCard.classList.remove('open', 'show', 'disabled');
          }, 1000);
          openCards = [];

        }

        //add new move
        addMove();


      } else {
        //there are no any opend cards
        currentCard.classList.add("open", "show", "disabled");
        openCards.push(this);

      }
      //call done function if all cards matched
      done();

    });

  }

}

/*

 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//define variables for timer function
const minutesUI = document.querySelector('.minute');
const secondsUI = document.querySelector('.seconds');
const timerContainer = document.querySelector(".timer");



let timer;
let minutes = 0,
  seconds = 0;


let timerOn = false;

//to start timer
function startTimer() {
  timer = setInterval(() => {
    seconds++;
    if (seconds === 59) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 59) {
      minutes = 0;
      seconds = 0;
    }
    minutesUI.innerHTML = minutes;
    secondsUI.innerHTML = seconds;
  }, 2000);
}

//add Moves
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;

function addMove() {
  moves++;
  movesContainer.innerHTML = moves;
  //call ratings function
  ratings();
}


//ratings

const starsContainer = document.querySelector(".stars");

function ratings() {

  if (moves < 6) {
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;
  } else if (moves < 12) {
    starsContainer.innerHTML = starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
  } else {
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  }
}

//define variables for congrats modal
const popUp = document.querySelector('.popUp');
const timePopUp = document.querySelector('.time-popUp');
const ratingPopUp = document.querySelector('.rating-popUp');
const movesPopUp = document.querySelector('.moves-popUp');
const btnPopUp = document.querySelector('.btn-popUp');





//restart game
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
  //delete all Cards
  myContainer.innerHTML = "";

  //call init to create new Cards
  init();

  restartGame();



});
//restart game function
function restartGame() {
  isFirstClick = true;
  timerOn = false;
  //clear the deck
  matchedCards = [];
  openCards = [];
  //reset moves
  moves = 0;
  movesContainer.innerHTML = moves;

  //reste timer variables

  timer = 0;
  seconds = 0;
  minutes = 0;

  clearInterval(timer);
  //reste stars
  starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;

}

//congrats popup
function done() {
  //if all cards matched show this
  if (matchedCards.length === 16) {
    //call the results of moves,time and stars
    timePopUp.innerText = timerContainer.innerText;
    ratingPopUp.innerHTML = starsContainer.innerHTML;
    movesPopUp.innerHTML = movesContainer.innerHTML.slice(0, 3);

    clearInterval(timer);
    popUp.style.display = 'block';
  }
}
btnPopUp.addEventListener('click', function() {
  // to close the popup and restart the game
  popUp.style.display = 'none';
  restartGame();
  timerOn = false;
})
//intitlaize game again
init();
