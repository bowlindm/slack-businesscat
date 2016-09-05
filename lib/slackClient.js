var RtmClient = require('@slack/client').RtmClient;
var WebClient = require('@slack/client').WebClient;
var MemoryDataStore = require('@slack/client').MemoryDataStore;

var token = process.env.SLACK_API_TOKEN || '';

module.exports = {
  rtm: new RtmClient(token, {dataStore: new MemoryDataStore()}),
  web: new WebClient(token)
};
