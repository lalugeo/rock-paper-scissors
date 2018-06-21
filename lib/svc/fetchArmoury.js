const currentGame = require('../svc/currentGame.js');
/**
* The http request handler for fetching the list of
* weapons that are avaialble in the current game
* @param {object} req - the http request object
* @param {object} res - the http response object
* @returns {object} 200 OK with the list of weeapons if everrything wenet well
*/
module.exports = (req, res) => {
  let status = 200;
  let armoury;
  res.setHeader('Content-Type', 'application/json');
  try {
    armoury = JSON.stringify(currentGame.game.getWeapons());
  } catch (e) {
    armoury = JSON.stringify({ error: e.message });
    status = 500;
  }
  res.writeHead(status);
  res.write(armoury);
  res.end();
};
