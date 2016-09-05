var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var slack = require('./slackClient');

var jargon = require('../data/triggers.json');
var jargonRegExp = new RegExp(jargon.join('|'), 'gi');

var stats = require('./stats.js');

function matchJargon(message) {
  function matches(obj) {
    return obj.text && obj.text.match(jargonRegExp);
  }
  return matches(message) || (message.attachments && message.attachments.some(matches));
}

function run() {
  slack.rtm.on(RTM_EVENTS.MESSAGE, function parseMessage(message) {
    var matches = matchJargon(message);
    if (matches) {
      slack.web.reactions.add('businesscat', {
        channel: message.channel,
        timestamp: message.ts
      });
      matches.forEach(function (match) {
        stats.log(message.user, message.channel, match);
      });
    }
  });
  slack.rtm.start();
}

module.exports = {
  run: run
};
