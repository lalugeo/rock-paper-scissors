const http = require('http');
const routes = require('./lib/view/js/routes.js');

const server = http.createServer((req, resp) => {
  if (req.url === '/' || req.url === '/newGame') {
    routes('newGame')(req, resp);
  } else if (req.url === '/match') {
    routes('match')(req, resp);
  } else if (req.url.match(/\/css\//) || req.url.match(/\/ext_lib\//) || req.url.match(/\/view\/js\//)) {
    routes('activeFile')(req, resp);
  } else if (req.url.match(/\/svc\/initialise/)) {
    routes('webServices').initialise(req, resp);
  } else {
    resp.writeHead(404, { 'Content-Type': 'text/html' });
    resp.write('No such page found!');
    resp.end();
  }
});
server.listen(5050);
