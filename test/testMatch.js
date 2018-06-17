/* eslint-env mocha */

const { expect } = require('chai');
const Game = require('../lib/control/game.js');
const MachinePlayer = require('../lib/control/machinePlayer.js');
const HumanPlayer = require('../lib/control/humanPlayer.js');

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
describe('full match test', () => {
  beforeEach(() => {
    newGame = new Game([rock, paper, scissors]);
  });

  it('humna vs human', () => {
    //  new game
    const human1 = new HumanPlayer('lalu');
    const human2 = new HumanPlayer('george');
    newGame.setPlayer1(human1);
    newGame.setPlayer2(human2);
    //  players are ready
    human1.setChosenWeapon('rock');
    human2.setChosenWeapon('scissors');
    return newGame.match()
      .then((winner) => {
        expect(winner).to.deep.equal(human1);
      });
  });

  it('human vs machine', () => {
    //  new game
    const human = new HumanPlayer('lalu');
    const machine = new MachinePlayer(10);//  machine always selects scissors
    newGame.setPlayer1(human);
    newGame.setPlayer2(machine);
    //  players are ready
    human.setChosenWeapon('paper');
    machine.selectWeapon(newGame.getWeapons());
    return newGame.match()
      .then((winner) => {
        expect(winner).to.deep.equal(machine);
      });
  });

  it('machine vs machine', () => {
    //  new game
    const machine1 = new MachinePlayer(10);//  machine always selects scissors
    const machine2 = new MachinePlayer(10);//  machine always selects scissors
    newGame.setPlayer1(machine1);
    newGame.setPlayer2(machine2);
    //  players are ready
    machine1.selectWeapon(newGame.getWeapons());
    machine2.selectWeapon(newGame.getWeapons());
    return newGame.match()
      .then((winner) => {
        expect(winner).to.deep.equal(null);// always a match between very lucky machines
      });
  });
});
