// Import the SSR app that Quasar has already built.
const SSRApp = require('../dist/ssr/index.js');

// Export to Vercel for further processing.
module.exports = SSRApp.default;
