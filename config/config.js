'use strict';

module.exports = {
  development: require('./env/development')
}[process.env.NODE_ENV || 'development'];
