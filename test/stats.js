/* eslint max-nested-callbacks: ["warn", 5] */

var assert = require('assert');
var stats = require('../lib/stats');

describe('stats', function () {
  describe('log', function () {
    it('should record an infraction for a user', function () {
      return stats.log('barney', 'buffaloclub', 'punch a puppy');
    });
  });

  describe('topUsers', function () {
    it('should return a list of top users', function () {
      return stats.topUsers().then(function (userList) {
        assert.ok(userList.find(function (user) {
          return user.username === 'barney';
        }));
      });
    });
  });
});
