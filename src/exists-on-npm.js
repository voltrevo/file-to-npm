'use strict';

var npm = require('npm');

module.exports = function(pkg) {
  return new Promise(function(resolve, reject) {
    npm.load({}, function(err) {
      if (err) {
        reject(err);
        return;
      }

      npm.commands.view([pkg, 'versions'], true, function(err, msg) {
        if (!err) {
          resolve(true);
          return;
        }

        if (err.statusCode === 404) {
          resolve(false);
          return;
        }

        reject(err);
      });
    });
  })
};
