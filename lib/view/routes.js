const fs = require('fs');

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

module.exports = (routeName) => {
  const allRoutes = {
    newGame: sendBackPage('./lib/view/html/newGame.html'),
    match: sendBackPage('./lib/view/html/match.html'),
  };

  return allRoutes[routeName];
};
