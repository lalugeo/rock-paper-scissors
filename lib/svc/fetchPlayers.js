const currentGame = require('../svc/currentGame.js');
/**
* The http request handler for fetching the list of
* players involved in the current game
* @param {object} req - the http request object
* @param {object} res - the http response object
* @returns {object} 200 OK with the list of players if everything wenet well
*/
module.exports = (req, res) => {
  let status = 200;
  let players;
  res.setHeader('Content-Type', 'application/json');
  try {
    players = JSON.stringify({
      player1: currentGame.game.getPlayer1(),
      player2: currentGame.game.getPlayer2(),
    });
  } catch (e) {
    players = JSON.stringify({ error: e.message });
    status = 500;
  }
  res.writeHead(status);
  res.write(players);
  res.end();
};
