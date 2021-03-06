const Player = require('./player.js');

/**
* A human player class that represents a single player playing the game
* @module rock-paper-scissors/HumanPlayer
* @requires rock-paper-scissors/Player
*/
class HumanPlayer extends Player {
  /**
  * constructor for the HumanPlayer class
  * @param {string} name - name of the human
  * @constructor
  */
  constructor(name) {
    super(name, 0, false);// luck of a human is never handed out, but decided by fate!!
  }
}

module.exports = HumanPlayer;
