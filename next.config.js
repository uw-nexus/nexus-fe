const withPWA = require('next-pwa');

const isProd = process.env.NODE_ENV === 'production';

module.exports = withPWA({
  publicRuntimeConfig: {
    BE_ADDR: process.env.BE_ADDR || 'http://localhost:3100',
    FE_ADDR: process.env.FE_ADDR || 'http://localhost:3000',
  },
  pwa: {
    disable: !isProd,
    dest: 'public',
  },
});
