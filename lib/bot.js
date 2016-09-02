var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var WebClient = require('@slack/client').WebClient;

var jargon = require('../data/triggers.json');
var jargonRegExp = new RegExp(jargon.join('|'), 'gi');

function containsJargon(message) {
  function matches(obj) {
    return obj.text && obj.text.match(jargonRegExp);
  }
  return matches(message) || (message.attachments && message.attachments.some(matches));
}

function run() {
  var token = process.env.SLACK_API_TOKEN || '';

  var rtm = new RtmClient(token);
  var web = new WebClient(token);

  rtm.on(RTM_EVENTS.MESSAGE, function parseMessage(message) {
    console.log(require('util').inspect(message));
    if (containsJargon(message)) {
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
