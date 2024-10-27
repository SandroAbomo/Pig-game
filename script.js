"use strict";

// Data selecting element
let player0El = document.querySelector(".player--0");
let player1El = document.querySelector(".player--1");
let score0El = document.querySelector("#score--0");
let score1El = document.getElementById("score--1");
let currentScore0El = document.getElementById("current--0");
let currentScore1El = document.getElementById("current--1");
let diceEl = document.querySelector(".dice");
let btnRoll = document.querySelector(".btn--roll");
let btnNew = document.querySelector(".btn--new");
let btnHold = document.querySelector(".btn--hold");

// Starting Condition----
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

let currentScore, scores, activePlayer, playing;

// initialasation Function
let initialasation = function () {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  diceEl.classList.add("hidden");
};
initialasation();

// Swich Player Function
let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Turnery operator version
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Dice rolling function---
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");

    //   Add the the dice number to the current score---
    if (dice !== 1) {
      // currentScore = currentScore + dice;
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold button---
document.querySelector(".btn--hold").addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //  If a player wins the game//////// ---- Else did not win
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

// Restart the Game----

btnNew.addEventListener("click", initialasation);
