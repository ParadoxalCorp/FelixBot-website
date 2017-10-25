const configs = require('./_configs')

module.exports = {
  cookie: configs.auth.cookieAuth.cookieName || "login_cookie",
  password: configs.auth.cookieAuth.authCookiePass,
  isSecure: configs.isSecure || false,
  //redirectTo: configs.auth.failedLoginUrl,
  //redirectOnTry: false,
  //appendNext: 'redirect'
}