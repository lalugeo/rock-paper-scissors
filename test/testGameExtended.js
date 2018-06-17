/* eslint-env mocha */

const { expect } = require('chai');
const Game = require('../lib/control/game.js');
//  testcase descriptions taken from http://bigbangtheory.wikia.com/wiki/Rock_Paper_Scissors_Lizard_Spock
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
const spock = {
  name: 'spock',
  image: '/a/b/img4.png',
  rank: 3,
};
const lizard = {
  name: 'lizard',
  image: '/a/b/img5.png',
  rank: 4,
};
describe('weapon class test', () => {
  before(() => {
    newGame = new Game([rock, paper, scissors, spock, lizard]);
  });

  it('loading of weapons should happen correctly', () => {
    expect(newGame.getWeapons())
      .to.deep.equal([
        rock,
        paper,
        scissors,
        spock,
        lizard,
      ]);
  });

  it('scissors cut paper', () =>
    newGame.checkWhoWins('scissors', 'paper')
      .then((winner) => {
        expect(winner)
          .to.deep.equal(scissors);
      }));

  it('paper covers rock', () =>
    newGame.checkWhoWins('rock', 'paper')
      .then((winner) => {
        expect(winner)
          .to.deep.equal(paper);
      }));

  it('rock crushes lizard', () =>
    newGame.checkWhoWins('rock', 'lizard')
      .then((winner) => {
        expect(winner)
          .to.deep.equal(rock);
      }));

  it('lizard poisons spock', () =>
    newGame.checkWhoWins('lizard', 'spock')
      .then((winner) => {
        expect(winner)
          .to.deep.equal(lizard);
      }));

  it('spock smashes scissors', () =>
    newGame.checkWhoWins('spock', 'scissors')
      .then((winner) => {
        expect(winner)
          .to.deep.equal(spock);
      }));

  it('scissors decapitate lizard', () =>
    newGame.checkWhoWins('lizard', 'scissors')
      .then((winner) => {
        expect(winner)
          .to.deep.equal(scissors);
      }));

  it('lizard eats paper', () =>
    newGame.checkWhoWins('lizard', 'paper')
      .then((winner) => {
        expect(winner)
          .to.deep.equal(lizard);
      }));

  it('paper disproves spock', () =>
    newGame.checkWhoWins('spock', 'paper')
      .then((winner) => {
        expect(winner)
          .to.deep.equal(paper);
      }));

  it('spock vaporizes rock', () =>
    newGame.checkWhoWins('rock', 'spock')
      .then((winner) => {
        expect(winner)
          .to.deep.equal(spock);
      }));
});
