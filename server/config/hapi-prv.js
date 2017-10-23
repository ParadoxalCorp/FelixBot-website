"use strict";
const _plugins = require('./pluginsConfig')
const _routes = require("./routeConfig")
const _views = require("./viewsConfig")
const _config = require("./_configs")
const _auth = require("./bellAuthConfig")

module.exports = {
  _plugins : _plugins,
  _routes : _routes,
  _views : _views,
  _config : _config,
  _auth : _auth
}