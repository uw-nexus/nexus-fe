const withPWA = require('next-pwa');

module.exports = withPWA({
  publicRuntimeConfig: {
    BE_ADDR: process.env.BE_ADDR,
    FE_ADDR: process.env.FE_ADDR
  },
  pwa: {
    dest: 'public'
  }
});
