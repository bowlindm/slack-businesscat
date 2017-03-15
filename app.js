var bot = require('./lib/bot');
var express = require('express');
var app = express();

// We need to return a success code so AppFog doesn't shut us down
app.get('/', function (req, res) {
  res.status(200).send();
});

var server = app.listen(process.env.PORT || 3000, function () {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});

bot.run();
