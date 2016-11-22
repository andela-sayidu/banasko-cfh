'use strict';

var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');
var keys = rootPath + '/keys.txt';
// var testLocal = 'mongodb://localhost/cft';

module.exports = {
  root: rootPath,
  port: process.env.PORT,
  db: process.env.MONGOHQ_URL
};
