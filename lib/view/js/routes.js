const fs = require('fs');
const currentGame = require('../../svc/currentGame.js');
const getArmoury = require('../../svc/fetchArmoury.js');
const getPlayers = require('../../svc/fetchPlayers.js');

const sendBackPage = pageUrl => (req, res) => {
  fs.readFile(pageUrl, (error, pageContent) => {
    if (error) {
      res.writeHead(404);
      res.write('Could not load the page!');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(pageContent);
    }
    res.end();
  });
};

const sendBackOtherfiles = () => (req, res) => {
  fs.readFile(`.${req.url}`, (error, fileContent) => {
    if (error) {
      res.writeHead(404);
      res.write('Could not load the file!');
    } else {
      res.writeHead(200);
      res.write(fileContent);
    }
    res.end();
  });
};

module.exports = (routeName) => {
  const allRoutes = {
    index: sendBackPage('./lib/view/html/index.html'),
    activeFile: sendBackOtherfiles(),
    webServices: {
      initialise: currentGame.initGame,
      fetchArmoury: getArmoury,
      fetchPlayers: getPlayers,
    },
  };

  return allRoutes[routeName];
};
