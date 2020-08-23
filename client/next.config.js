const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  // if (phase === PHASE_DEVELOPMENT_SERVER) {
  //   return {
  //     /* development only config options here */
  //   }
  // }

  return {
    /* config options for all phases except development here */
    distDir: 'dist',
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
      // config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

      if (process.env.NODE_ENV === 'test') {
        // config.devtool = 'inline-source-map';
      }
      // Important: return the modified config
      return config;
    },
  };
};