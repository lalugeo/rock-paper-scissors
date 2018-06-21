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
    super(`turing-machine-${machineid}`, luck, true);//  luck of machines is not depended on fate!!
  }

  /**
  * randomly select a weapon from the armoury based on the luck
  * @param {array} armoury array of weapons in this game
  * @returns {string} name of a weapon
  */
  selectWeapon(armoury) {
    //  higher luck means higher ranked weapons are returned, and no lower ranked weapons
    const availableWeaponsStart = (this.luck >= armoury.length) ? armoury.length - 1 : this.luck;
    const availableWeaponsEnd = armoury.length;
    const seed = process.hrtime()[1].toString().slice(-3);
    const randomeNumber = Math.random(seed);
    const randomWeaponIndex = Math.floor((randomeNumber *//   generate a random
        (availableWeaponsEnd - availableWeaponsStart)) +//    number between availableWeaponsStart
                  availableWeaponsStart);//                   and availableWeaponsEnd
    return this.setChosenWeapon(armoury[randomWeaponIndex].getName());
  }
}

module.exports = MachinePlayer;
