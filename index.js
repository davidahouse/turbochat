var http = require('http');
var wss = require('./websockets-server');

var server = http.createServer(function (req, res) {
  console.log('Responding to a request.');
  res.end('<h1>Hello, What?</h1>');
});
server.listen(3000);
