const currentGame = require('../svc/currentGame.js');

module.exports = (req, res) => {
  res.writeHead(200);
  res.write(JSON.stringify(currentGame.game.getWeapons()));
  res.end();
};
