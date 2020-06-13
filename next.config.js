const withPWA = require('next-pwa');
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';
console.log(process.env.ALGOLIA_API_KEY);

module.exports = withPWA({
  publicRuntimeConfig: {
    BE_ADDR: process.env.BE_ADDR || 'http://localhost:3100',
    FE_ADDR: process.env.FE_ADDR || 'http://localhost:3000',
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID || '',
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY || '',
  },
  pwa: {
    disable: !isProd,
    dest: 'public',
  },
});
