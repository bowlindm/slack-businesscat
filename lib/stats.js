var db = require('orchestrate')(process.env.ORCHESTRATE_TOKEN || '');

function log(user, channel, matchingText) {
  return db.post('infractions', {
    user: user,
    channel: channel,
    matchingText: matchingText
  });
}

function topUsers(channel) {
  return db.newSearchBuilder()
    .collection('infractions')
    .limit(1)
    .top_values('value.user')
    .query(channel ? 'value.channel:' + channel : '*')
    .then(function (result) {
      // console.log(result.body);
      var valueCounts = result.body.aggregates.find(function (agg) {
        return agg.aggregate_kind === 'top_values' && agg.field_name === 'value.user';
      });
      // console.log(valueCounts);
      return valueCounts.entries.map(function (row) {
        return {
          userId: row.value,
          count: row.count
        };
      });
    });
}

module.exports = {
  log: log,
  topUsers: topUsers
};
