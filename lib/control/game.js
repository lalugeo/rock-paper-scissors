/**
* A class representing the operations that can be handled within a game
* @module rock-paper-scissors/Game
*/
class Game {
  /**
  * constructor for the game class
  * @constructor
  */
  constructor() {
    this.weapons = [];
  }

  /**
  * loads the set of weapons available for the Game.
  * the list of weapons are specified in a json format
  * @param {string} newWeapons - array of weapons to load for this game
  * @throws {Error} weapons to load must be an array!
  * @returns {Promise} resolving to array of weapons loaded
  */
  loadWeapons(newWeapons) {
    return new Promise((resolve, reject) => {
      if (!(newWeapons instanceof Array)) reject(new Error('weapons to load must be an array!'));
      this.weapons = this.weapons.concat(newWeapons);
      resolve(this.getWeapons());
    });
  }

  /**
  * determine who won for a perticular game
  * Logic taken from https://stackoverflow.com/questions/9553058/scalable-solution-for-rock-paper-scissor/9553712#9553712
  * @param {object} weapon1 - first player weapon involved in the game
  * @param {object} weapon2 - second player weapon involved in the game
  * @throws {Error} unexpected situation found in the game!
  * @returns {Promise} - resolving to the weapon who won the game, or false if it was a tie
  */
  checkWhoWins(weapon1, weapon2) {
    return new Promise((resolve, reject) => {
      const n = this.getCountOfWeapons();
      const winSituation = (n + (weapon1.getRank() - weapon2.getRank())) % n;

      if (winSituation === 1 || winSituation === 3) {
        return resolve(weapon1);
      }

      if (winSituation === 2 || winSituation === 4) {
        return resolve(weapon2);
      }

      if (winSituation === 0) {
        return resolve(false);
      }

      return reject(new Error('unexpected situation found in the game!'));
    });
  }

  /**
  * adds a new weapon by placing it in between beatBy weapon and beats weapon rank wise.
  * @param {object} newWeapon - first player weapon involved in the game
  * @param {object} beatBy - first player weapon involved in the game
  * @param {object} beats - first player weapon involved in the game
  * @returns {object} - the wepon newly inserted
  */
  addNewWeapon(newWeapon, beatBy, beats) {
    this.weapons.push(newWeapon);
    this.weapons.push(beats);
    return newWeapon;
  }

  /**
  * returns the number of weapons currently loaded in the game
  * @returns {integer} count of weapons
  */
  getCountOfWeapons() {
    return this.weapons.length;
  }
}

module.exports = Game;
