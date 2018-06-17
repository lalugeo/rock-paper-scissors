const Game = require('./lib/control/game.js');

const rock = {
  name: 'rock',
  image: '/a/b/img1.png',
  rank: 0,
};
const paper = {
  name: 'paper',
  image: '/a/b/img2.png',
  rank: 1,
};
const scissors = {
  name: 'scissors',
  image: '/a/b/img3.png',
  rank: 2,
};

const newGame = new Game([rock, paper, scissors]);
newGame.checkWhoWins('rock', 'scissors')
  .then((won) => {
    console.log(JSON.stringify(won)); // eslint-disable-line
  });
