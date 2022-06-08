// VAR INITIALIZATION

const players = JSON.parse(localStorage.getItem('players')); // List of players
const scoreList = document.querySelector('.scores-list'); // Score list DOM element
const nbTriesElement = document.querySelector('.nb-tries'); // Number of tries DOM element
const playerTurnDisp = document.querySelector('.player-turn'); // Player turn DOM element
const cards = document.querySelectorAll('.cartes'); // Array of cards DOM element
const gameVictory = document.querySelector('.game-victory'); // Modal when game ends
const chrono = document.getElementById('chrono'); // Location for timer
const soundFiles = [
  'void-traveler.mp3',
  'carte.mp3',
  'applaudissement.mp3',
  'honteux.mp3',
  'duel.mp3',
  'atoi.mp3',
  'nope.mp3',
  'wow.mp3',
  'fanfare.mp3',
];

// EVENT LISTENERS

document.querySelector('.game').addEventListener('click', handleGameClick); // Click in-game

// GAME INIT

const game = new Game(
  cards,
  players,
  nbTriesElement,
  playerTurnDisp
);

// Uncomment this to run tests on end game
// test(game);

// EVENT HANDLERS

function handleGameClick(e) {
  if (e.target.className === 'cartes') {
    game.nextMove(e);
  }
}

function mixArray(array) {
  // Utilisation de l'algorithme de Fisher-Yates
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function test(o) {
  o.cardsFound = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
