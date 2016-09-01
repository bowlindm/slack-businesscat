var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var WebClient = require('@slack/client').WebClient;

var jargon = require('../data/triggers.json');

function run() {
  var token = process.env.SLACK_API_TOKEN || '';

  var rtm = new RtmClient(token);
  var web = new WebClient(token);

  var jargonRegExp = new RegExp(jargon.join('|'), 'gi');

  rtm.on(RTM_EVENTS.MESSAGE, function parseMessage(message) {
    if (message.text.match(jargonRegExp)) {
      web.reactions.add('businesscat', {
        channel: message.channel,
        timestamp: message.ts
      });
    }
  });
  rtm.start();
}

module.exports = {
  run: run
};
