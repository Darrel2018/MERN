// 6a09a3d59aba03cb0ab05738

const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver
};

module.exports = rootResolver;