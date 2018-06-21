const currentGame = require('../svc/currentGame.js');

/**
* The http request handler for choosing a weapon
* for the human getPlayers
* @param {object} req - the http request object
* @param {object} res - the http response object
* @returns {object} 200 OK if everything wenet well
*/
module.exports = (req, res) => {
  let status = 200;
  res.setHeader('Content-Type', 'application/json');
  try {
    const incomingBody = JSON.parse(req.body);
    let currentPlayer;
    if (incomingBody.currentMove === 'player1') {
      currentPlayer = currentGame.game.getPlayer1();
    } else {
      currentPlayer = currentGame.game.getPlayer2();
    }
    currentPlayer.setChosenWeapon(incomingBody.weapon);
  } catch (e) {
    status = 500;
  }
  res.writeHead(status);
  res.end();
};
