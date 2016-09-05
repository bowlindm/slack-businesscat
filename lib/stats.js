var statsDb = require('./statsDb');
var slack = require('./slackClient');

function log(user, channel, matchingText) {
  return statsDb.log(user, channel, matchingText);
}

function topUsers() {
  return statsDb.topUsers()
    .then(function (usersById) {
      return usersById.map(function (user) {
        var slackUser = slack.rtm.dataStore.getUserById(user.userId);
        return {
          username: slackUser.name,
          name: slackUser.real_name,
          count: user.count
        };
      });
    });
}

module.exports = {
  log: log,
  topUsers: topUsers
};
