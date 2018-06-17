const Weapon = require('./weapon');

/**
* A class representing the operations that can be handled within a game
* @module rock-paper-scissors/Game
* @requires rock-paper-scissors/Weapon
*/
class Game {
  /**
  * constructor for the game class
  * @param {array} [newWeapons] - array of weapons
  * @param {object} [player1] - first player involved in the game
  * @param {object} [player2] - second player involved in the game
  * @constructor
  */
  constructor(newWeapons, player1, player2) {
    this.weapons = [];
    if (newWeapons && (newWeapons instanceof Array) && newWeapons.length > 0) {
      this.loadWeaponsSync(newWeapons);
    }

    if (player1) this.player1 = player1;
    if (player2) this.player2 = player2;
  }

  /**
  * async version of loading the set of weapons available for the Game.
  * the list of weapons are specified in a json format
  * @param {string} newWeapons - array of weapons to load for this game
  * @throws {Error} weapons to load must be an array!
  * @returns {Promise} resolving to array of weapons loaded
  */
  loadWeapons(newWeapons) {
    const self = this;
    return new Promise((resolve, reject) => {
      if (!(newWeapons instanceof Array)) reject(new Error('weapons to load must be an array!'));
      newWeapons.forEach((weapon) => {
        self.addNewWeaponSync(new Weapon(weapon.name, weapon.image, weapon.rank));
      });
      resolve();
    })
      .then(this.getWeapons);
  }

  /**
  * sync version of loading the set of weapons available for the Game.
  * the list of weapons are specified in a json format
  * @param {string} newWeapons - array of weapons to load for this game
  * @throws {Error} weapons to load must be an array!
  * @returns {array} of weapons loaded
  */
  loadWeaponsSync(newWeapons) {
    const self = this;
    if (!(newWeapons instanceof Array)) throw new Error('weapons to load must be an array!');
    newWeapons.forEach((weapon) => {
      self.addNewWeaponSync(new Weapon(weapon.name, weapon.image, weapon.rank));
    });
    return this.getWeapons();
  }

  /**
  * determine who won for a perticular game
  * Logic taken from https://stackoverflow.com/questions/9553058/scalable-solution-for-rock-paper-scissor/9553712#9553712
  * @param {string} weapon1Name - first player weapon name involved in the game
  * @param {string} weapon2Name - second player weapon name involved in the game
  * @throws {Error} unexpected situation found in the game!
  * @returns {Promise} - resolving to the weapon who won the game, or false if it was a tie
  */
  checkWhoWins(weapon1Name, weapon2Name) {
    return Promise.all([this.getWeaponNamedAs(weapon1Name), this.getWeaponNamedAs(weapon2Name)])
      .then(weapons => new Promise((resolve, reject) => {
        const weapon1 = weapons[0];
        const weapon2 = weapons[1];
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
      }))
      .catch((err) => {
        throw err;
      });
  }

  /**
  * adds a new weapon by placing it in between ranks of beats and beatBy weapons.
  * if the beats and beatBy weapons are not provided, new weapon is pushed to
  * the end of the armoury
  * @param {object} newWeapon - new weapon to add to the armoury
  * @param {string} beatsName - @todo new weapon will beat this weapon mentioned by name
  * @param {string} beatByName -@todo new weapon will be beat by this weapon mentioned by name
  * @returns {Promise} - resolving to the wepon newly inserted
  */
  addNewWeapon(newWeapon) /* , beatsName, beatByName) */{
    this.weapons.push(newWeapon);
    return Promise.reoslve(newWeapon);
  }

  /**
  * sync adds a new weapon by placing it in between ranks of beats and beatBy weapons.
  * if the beats and beatBy weapons are not provided, new weapon is pushed to
  * the end of the armoury
  * @param {object} newWeapon - new weapon to add to the armoury
  * @param {string} beatsName - @todo new weapon will beat this weapon mentioned by name
  * @param {string} beatByName -@todo new weapon will be beat by this weapon mentioned by name
  * @returns {object} - the wepon newly inserted
  */
  addNewWeaponSync(newWeapon) /* , beatsName, beatByName) */{
    this.weapons.push(newWeapon);
    return newWeapon;
  }

  /**
  * returns the number of weapons currently loaded in the game
  * @returns {integer} count of weapons
  */
  getCountOfWeapons() {
    return this.getWeapons().length;
  }

  /**
  * returns the weapons currently loaded in the game
  * @returns {array} of weapons
  */
  getWeapons() {
    return this.weapons;
  }

  /**
  * returns the weapon specified by the name from the armory
  * @param {string} weaponName name of the weapon to search
  * @throws {Error} weapon not found!
  * @returns {Promise} resolving to the weapon searched for in the armory
  */
  getWeaponNamedAs(weaponName) {
    return new Promise((resolve, reject) => {
      let weaponFound = false;
      let foundThisWeapon;
      const armoury = this.getWeapons();
      armoury.forEach((weapon) => {
        if (weapon.getName() === weaponName) {
          weaponFound = true;
          foundThisWeapon = weapon;
          return weaponFound;
        }
        return false;
      });
      if (weaponFound === true) {
        return resolve(foundThisWeapon);
      }
      return reject(new Error('weapon not found!'));
    });
  }

  /**
  * clears the list of weapons currently loaded in the game
  * @returns {array} of weapons currently loaded (empty)
  */
  clearWeapons() {
    this.weapons = [];
    return this.getWeapons();
  }

  /**
  * fetches the player1
  * @returns {object} player1
  */
  getPlayer1() {
    return this.player1;
  }

  /**
  * sets the player1
  * @param {object} player - the player who is first player
  * @returns {object} player1
  */
  setPlayer1(player) {
    this.player1 = player;
  }

  /**
  * fetches the player2
  * @returns {object} player2
  */
  getPlayer2() {
    return this.player2;
  }

  /**
  * sets the player2
  * @param {object} player - the player who is second player
  * @returns {object} player2
  */
  setPlayer2(player) {
    this.player2 = player;
  }

  /**
  * tries to do a match between player1 and player2
  * @throws {Error} unexpected state of match!
  * @returns {object} player who won, null if a tie
  */
  match() {
    return this.checkWhoWins(this.player1.getChosenWeapon(), this.player2.getChosenWeapon())
      .then(strongerWeapon => new Promise((resolve, reject) => {
        if (strongerWeapon === false) {
          return resolve(null);
        }

        if (this.player1.getChosenWeapon() === strongerWeapon.getName()) {
          return resolve(this.player1);
        }
        if (this.player2.getChosenWeapon() === strongerWeapon.getName()) {
          return resolve(this.player2);
        }

        return reject(new Error('unexpected state of match!'));
      }))
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = Game;
