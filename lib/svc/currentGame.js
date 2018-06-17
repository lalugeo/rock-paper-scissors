const Game = require('../control/game.js');
const weapons = require('../model/weapons.json');
const weaponsExtended = require('../model/weaponsExtended.json');

const current = {
  game: {},
  initGame: (req, res) => {
    if (req.body.extended === true) {
      current.game = new Game(weaponsExtended);
    } else {
      current.game = new Game(weapons);
    }
    res.writeHead(200);
    res.end();
  },
};

module.exports = current;
