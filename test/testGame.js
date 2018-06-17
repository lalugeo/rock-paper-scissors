/* eslint-env mocha */

const { expect } = require('chai');
const Game = require('../lib/control/game.js');

let newGame;
const rock = {
  name: 'rock',
  image: '/a/b/img1.png',
  rank: 0,
};
const paper = {
  name: 'paper',
  image: '/a/b/img2.png',
  rank: 1,
};
const scissors = {
  name: 'scissors',
  image: '/a/b/img3.png',
  rank: 2,
};
describe('game class test', () => {
  before(() => {
    newGame = new Game([rock, paper, scissors]);
  });

  it('loading of weapons should happen correctly', () => {
    expect(newGame.getWeapons())
      .to.deep.equal([
        rock,
        paper,
        scissors,
      ]);
  });

  it('fetching scissors should return scissors', () =>
    newGame.getWeaponNamedAs('scissors')
      .then((weapon) => {
        expect(weapon)
          .to.deep.equal(scissors);
      }));

  it('fetching non existant weapon should return error', () =>
    newGame.getWeaponNamedAs('missile')
      .catch(err => new Promise((resolve) => {
        resolve(err);
      }))
      .then((raisedErr) => {
        expect(raisedErr.message)
          .to.deep.equal('weapon not found!');
      }));

  it('rock should blunt scissors', () =>
    newGame.checkWhoWins('rock', 'scissors')
      .then((winner) => {
        expect(winner)
          .to.deep.equal(rock);
      }));

  it('scissors should cut paper', () =>
    newGame.checkWhoWins('paper', 'scissors')
      .then((winner) => {
        expect(winner)
          .to.deep.equal(scissors);
      }));

  it('paper should cover rock', () =>
    newGame.checkWhoWins('rock', 'paper')
      .then((winner) => {
        expect(winner)
          .to.deep.equal(paper);
      }));

  it('scissors vs scissors should be a tie', () =>
    newGame.checkWhoWins('scissors', 'scissors')
      .then((winner) => {
        expect(winner)
          .to.deep.equal(false);
      }));

  it('even one non existant weapon in match should throw error', () =>
    newGame.checkWhoWins('scissors', 'missile')
      .catch(err => new Promise((resolve) => {
        resolve(err);
      }))
      .then((raisedErr) => {
        expect(raisedErr.message)
          .to.deep.equal('weapon not found!');
      }));

  it('both non existant weapons in match should throw error', () =>
    newGame.checkWhoWins('shark', 'missile')
      .catch(err => new Promise((resolve) => {
        resolve(err);
      }))
      .then((raisedErr) => {
        expect(raisedErr.message)
          .to.deep.equal('weapon not found!');
      }));
});
