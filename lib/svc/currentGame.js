const Game = require('../control/game.js');
const HumanPlayer = require('../control/humanPlayer.js');
const MachinPlayer = require('../control/machinePlayer.js');
const weapons = require('../model/weapons.json');
const weaponsExtended = require('../model/weaponsExtended.json');

const current = {
  game: {},
  initGame: (req, res) => {
    const incomingBody = JSON.parse(req.body);
    let player1;
    let player2;
    if (incomingBody.player1.type === 'human') {
      player1 = new HumanPlayer(incomingBody.player1.name);
    } else {
      player1 = new MachinPlayer(incomingBody.gameLevel);
    }

    if (incomingBody.player2.type === 'human') {
      player2 = new HumanPlayer(incomingBody.player2.name);
    } else {
      player2 = new MachinPlayer(incomingBody.gameLevel);
    }

    if (incomingBody.gameType === 'Extended') {
      current.game = new Game(weaponsExtended);
    } else {
      current.game = new Game(weapons);
    }

    current.game.setPlayer1(player1);
    current.game.setPlayer2(player2);
    res.writeHead(200);
    res.end();
  },
};

module.exports = current;
