const configs = require('./_configs')

module.exports = {
  provider: 'discord',
  password: configs.auth.bellAuth.authCookiePass,
  isSecure: configs.isSecure || false,
  // Fill in your clientId and clientSecret: https://discordapp.com/developers/applications/me
  clientId: configs.auth.bellAuth.clientId,
  clientSecret: configs.auth.bellAuth.clientSecret,
  scope : configs.auth.bellAuth.scope || ['email', 'guilds', 'connections', 'identify'],
  forceHttps : configs.isSecure
}