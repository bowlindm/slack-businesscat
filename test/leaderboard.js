/* eslint max-nested-callbacks: ["warn", 5] */

var assert = require('assert');
var leaderboard = require('../lib/leaderboard');

describe('leaderboard', function () {
  describe('log', function () {
    it('should record an infraction for a user', function () {
      return leaderboard.log('barney', 'buffaloclub', 'punch a puppy');
    });
  });

  describe('topUsers', function () {
    it('should return a list of top users', function () {
      return leaderboard.topUsers().then(function (userList) {
        assert.ok(userList.find(function (user) {
          return user.username === 'barney';
        }));
      });
    });
  });
});
