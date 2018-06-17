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
  * @param {boolean} isMachine - boolean flag representing whether this player is a mahcine
  * @constructor
  */
  constructor(name, luck, isMachine) {
    this.name = name;
    this.luck = luck;
    this.machine = isMachine;
  }

  /**
  * getter for the name of the player
  * @returns {string} name of the player
  */
  getName() {
    return this.name;
  }

  /**
  * determine if the player is a machine
  * @returns {boolean} true if mahcine, false, if not
  */
  CheckIfMachine() {
    return this.machine;
  }
}

module.exports = Player;
