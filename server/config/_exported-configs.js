"use strict";
const _plugins = require('./pluginsConfig')
const _routes = require("./routeConfig")
const _views = require("./viewsConfig")
const _config = require("./_configs")
const _BellAuth = require("./bellAuthConfig")
const _CookieAuth = require("./cookieAuthConfig")

module.exports = {
  _plugins : _plugins,
  _routes : _routes,
  _views : _views,
  _config : _config,
  _CookieAuth : _CookieAuth,
  _BellAuth : _BellAuth
}