const currentGame = require('../svc/currentGame.js');

module.exports = (req, res) => {
  res.writeHead(200);
  res.write(JSON.stringify({
    player1: currentGame.game.getPlayer1(),
    player2: currentGame.game.getPlayer2(),
  }));
  res.end();
};
