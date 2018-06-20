const currentGame = require('../svc/currentGame.js');

module.exports = (req, res) => {
  const incomingBody = JSON.parse(req.body);
  let currentPlayer;
  if (incomingBody.currentMove === 'player1') {
    currentPlayer = currentGame.game.getPlayer1();
  } else {
    currentPlayer = currentGame.game.getPlayer2();
  }
  if (currentPlayer.CheckIfMachine()) {
    currentPlayer.selectWeapon(currentGame.game.getWeapons());
  } else {
    currentPlayer.setChosenWeapon(incomingBody.choosenWeapon);
  }
  res.writeHead(200);
  res.end();
};
