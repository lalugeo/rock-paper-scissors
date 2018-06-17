/**
* A generic player class that represents a single player playing the game
* @module rock-paper-scissors/Player
*/
class Player {
  /**
  * constructor for the player class
  * @param {string} name - name of the player
  * @param {integer} luck - integer representing the luck (which
  * controls the weapons avaialble to this machine)
  * @constructor
  */
  constructor(name, luck) {
    this.name = name;
    this.luck = luck;
  }

  /**
  * getter for the name of the player
  * @returns {string} name of the player
  */
  getName() {
    return this.name;
  }
}

module.exports = Player;
