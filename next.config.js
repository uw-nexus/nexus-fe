const withPWA = require('next-pwa');

const isProd = process.env.NODE_ENV === 'production';

module.exports = withPWA({
  publicRuntimeConfig: {
    BE_ADDR: process.env.BE_ADDR,
    FE_ADDR: process.env.FE_ADDR,
  },
  pwa: {
    disable: !isProd,
    dest: 'public',
  },
});
