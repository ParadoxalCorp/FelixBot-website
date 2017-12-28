"use strict";

const fs = require('fs');
const Hapi = require("hapi");
const { _BellAuth, _CookieAuth, _plugins, _routes, _views } = require("./server/config/_exports");
const { port, host } = require("./config/_configs");
const server = new Hapi.Server();

const options = {
  key: fs.readFileSync('./server/ssl/felix-bot.key'),
  cert: fs.readFileSync('./server/ssl/felix-bot.crt'),
};

server.connection({
  tls: options,
  port: port,
  host: host,
  router: {
    stripTrailingSlash: true,
  },
});

server.register(_plugins, function () {
  server.log('info', 'Plugins registered');

  server.auth.strategy('session', 'cookie', _CookieAuth);
  server.log('info', 'Registered auth strategy: cookie auth');
  server.auth.strategy('discord', 'bell', _BellAuth);
  server.log('info', 'Registered auth strategy: discord auth');

  server.views(_views);
  server.log('info', 'View configuration completed');

  server.route(_routes);
  server.log('info', 'Routes registered');

  server.start((error) => {
    if (error) {
      server.log('error', 'failed to start server');
      throw error;
    }
    server.log('info', ` The servers uri is    ${server.info.uri}`);
  });
});
