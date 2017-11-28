const configs = require('../../config/_configs');

module.exports = {
  cookie: configs.auth.cookieAuth.cookieName || "login_cookie",
  password: configs.auth.cookieAuth.authCookiePass,
  isSecure: configs.isSecure || false,
  isSameSite: configs.auth.cookieAuth.isSameSite || "Lax",
  redirectTo: configs.auth.loginUrl,
  redirectOnTry: false,
  appendNext: 'redirect'
};
