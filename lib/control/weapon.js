/**
* A generic weapon class that represents a object that can be included in the game
* @module rock-paper-scissors/Weapon
*/
class Weapon {
  /**
  * constructor for the weapons class
  * @param {string} name - name of the weapon
  * @param {string} image - image url of the weapon
  * @param {integer} rank - rank of the weapon, ideally corresponds to the array index
  * @constructor
  */
  constructor(name, image, rank) {
    this.name = name;
    this.image = image;
    this.rank = rank;
  }

  /**
  * getter for the name of the weapon
  * @returns {string} name of the weapon
  */
  getName() {
    return this.name;
  }

  /**
  * getter for the image of the weapon
  * @returns {string} image src url of the weapon
  */
  getImage() {
    return this.image;
  }

  /**
  * getter for the rank of the weapon
  * @returns {integer} rank of the weapon
  */
  getRank() {
    return this.rank;
  }
}

module.exports = Weapon;
