var bot = require('./lib/bot');
var slack = require('./lib/slack');
var stats = require('./lib/stats');
var express = require('express');
var app = express();

// We need to return a success code so AppFog doesn't shut us down
app.get('/', function (req, res) {
  res.status(200).send();
});

app.get('/api/stats', function (req, res) {
  return stats.topUsers()
    .then(function (usersById) {
      var users = usersById.map(function (user) {
        var slackUser = slack.rtm.dataStore.getUserById(user.userId);
        return {
          username: slackUser.name,
          name: slackUser.real_name,
          count: user.count
        };
      });
      res.status(200).json(users);
    });
});

var server = app.listen(process.env.PORT || 3000, function () {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});

bot.run();
