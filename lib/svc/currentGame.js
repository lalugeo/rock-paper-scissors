const Game = require('../control/game.js');
const HumanPlayer = require('../control/humanPlayer.js');
const MachinPlayer = require('../control/machinePlayer.js');
const weapons = require('../model/weapons.json');
const weaponsExtended = require('../model/weaponsExtended.json');

const current = {
  /**
  * A singleton object that holds the current game being played
  */
  game: {},

  /**
  * The http request handler for initialising a game
  * @param {object} req - the http request object
  * @param {object} res - the http response object
  * @returns {object} 200 OK if everything wenet well
  */
  initGame: (req, res) => {
    let status = 200;
    res.setHeader('Content-Type', 'application/json');
    try {
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
    } catch (e) {
      status = 500;
    }
    res.writeHead(status);
    res.end();
  },
};

module.exports = current;
