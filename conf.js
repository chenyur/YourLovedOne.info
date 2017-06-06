'use strict';

//adapted from tutorial
var process = require('process');
var nconf = require('nconf');
nconf.use('memory');
nconf.env().argv(); // prefer env var and arg

let env = process.env.NODE_ENV || 'production';

if (env === 'development') {
  nconf.file('./config/dev.json');
} else {
  nconf.file('./config/prod.json');
}

module.exports = nconf;
