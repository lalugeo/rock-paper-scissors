const http = require('http');
const routes = require('./lib/view/js/routes.js');

const server = http.createServer((req, resp) => {
  req.body = [];
  req.on('data', (chunk) => {
    req.body.push(chunk);
  }).on('end', () => {
    req.body = Buffer.concat(req.body).toString();
    if (req.url === '/') {
      routes('index')(req, resp);
    } else if (req.url.match(/\/css\//) || req.url.match(/\/ext_lib\//) || req.url.match(/\/view\/js\//)) {
      routes('activeFile')(req, resp);
    } else if (req.url.match(/\/svc\/initialise/)) {
      routes('webServices').initialise(req, resp);
    } else if (req.url.match(/\/svc\/fetchArmoury/)) {
      routes('webServices').fetchArmoury(req, resp);
    } else {
      resp.writeHead(404, { 'Content-Type': 'text/html' });
      resp.write('No such page found!');
      resp.end();
    }
  });
});
server.listen(5050);
