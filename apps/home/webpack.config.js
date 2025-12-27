const { composePlugins, withNx, withWeb } = require('@nx/webpack');
const { withModuleFederation } = require('@nx/module-federation/webpack');
const federationConfig = require('./module-federation.config');
const { join } = require('path');

module.exports = composePlugins(
  withNx(),
  withWeb(),
  // Add dts: false here to stop the background port locking
  withModuleFederation({
    ...federationConfig,
    dts: false 
  }),
  (config) => {
    config.output = {
      ...config.output,
      path: join(__dirname, '../../dist/apps/home'),
    };
    return config;
  }
);
