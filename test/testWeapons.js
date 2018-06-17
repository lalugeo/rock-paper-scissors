/* eslint-env mocha */

const { expect } = require('chai');
const Weapon = require('../lib/control/weapon.js');

let someWeapon;

describe('weapon class test', () => {
  before(() => {
    someWeapon = new Weapon('rock', '/a/b/img.png', 1);
  });

  it('get name should return correct', () => {
    expect(someWeapon.getName()).to.equal('rock');
  });

  it('get image should return correct', () => {
    expect(someWeapon.getImage()).to.equal('/a/b/img.png');
  });

  it('get rank should return correct', () => {
    expect(someWeapon.getRank()).to.equal(1);
  });
});
