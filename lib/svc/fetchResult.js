const currentGame = require('../svc/currentGame.js');
/**
* The http request handler for fetching the results
* of the currently played match
* @param {object} req - the http request object
* @param {object} res - the http response object
* @returns {object} 200 OK if everything wenet well
*/
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const player1 = currentGame.game.getPlayer1();
  const player2 = currentGame.game.getPlayer2();
  if (player1.CheckIfMachine()) {
    player1.selectWeapon(currentGame.game.getWeapons());
  }
  if (player2.CheckIfMachine()) {
    player2.selectWeapon(currentGame.game.getWeapons());
  }

  currentGame.game.match()
    .then((winner) => {
      res.writeHead(200);
      res.write(JSON.stringify({
        winner: (winner) ? winner.getName() : 'A tie!',
        result: `Player 1 - ${player1.getName()} chose ${player1.getChosenWeapon()} and Player 2 - ${player2.getName()} chose ${player2.getChosenWeapon()}`,
      }));
    })
    .catch((e) => {
      res.writeHead(500);
      res.write(JSON.stringify({ error: e.message }));
    })
    .then(() => {
      res.end();
    });
};
