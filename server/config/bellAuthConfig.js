const configs = require('./_configs')

module.exports = {
  provider: 'discord',
  password: configs.auth.authCookiePass,
  isSecure: configs.isSecure,
  // Fill in your clientId and clientSecret: https://discordapp.com/developers/applications/me
  clientId: configs.auth.clientId,
  clientSecret: configs.auth.clientSecret
}