const Player = require('./player.js');

/**
* A human player class that represents a single player playing the game
* @module rock-paper-scissors/MachinePlayer
* @requires rock-paper-scissors/Player
*/
class MachinePlayer extends Player {
  /**
  * constructor for the MachinePlayer class
  * @param {integer} luck - integer representing the luck (which
  * controls the weapons avaialble to this machine)
  * @constructor
  */
  constructor(luck) {
    const machineid = process.hrtime()[0];
    super(`turing-machine-${machineid}`, luck);//  luck of machines is not depended on fate!!
  }

  /**
  * randomly select a weapon from the armoury based on the luck
  * @param {array} armoury array of weapons in this game
  * @returns {string} name of a weapon
  */
  selectWeapon(armoury) {
    const availableWeaponsStart = this.luck;//  higher luck means higher ranked
    // weapons are returned, and no lower ranked weapons
    const availableWeaponsEnd = armoury.length - 1;
    const randomWeaponIndex = Math.floor((Math.random() *//   generate a random
        (availableWeaponsEnd - availableWeaponsStart)) +//    number between availableWeaponsStart
                  availableWeaponsStart);//                   and availableWeaponsEnd
    return armoury[randomWeaponIndex];
  }
}

module.exports = MachinePlayer;
