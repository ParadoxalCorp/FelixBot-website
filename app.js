"use strict"
const Hapi = require("hapi")
const server = new Hapi.Server()
const configs = require("./server/config/_exported-configs")
const fs = require('fs')

const options = {  
  key: fs.readFileSync('./server/ssl/felix-bot.key'),
  cert:  fs.readFileSync('./server/ssl/felix-bot.crt')
};

server.connection({
  tls: options,
  port: configs._config.port,
  host: configs._config.host, 
  router: {
    stripTrailingSlash: true,
  }
})

server.register(configs._plugins, () => {
  server.log('info', 'Plugins registered')

  server.auth.strategy('session', 'cookie', configs._CookieAuth)
  server.log('info', 'Registered auth strategy: cookie auth')
  server.auth.strategy('discord', 'bell', configs._BellAuth)
  server.log('info', 'Registered auth strategy: discord auth')

  server.views(configs._views);
  server.log('info', 'View configuration completed')

  server.route(configs._routes);
  server.log('info', 'Routes registered')

  server.start((error) => {
    if (error) { 
      server.log('error', 'failed to start server')
      throw error
    }
    server.log('info', ` The servers uri is    ${server.info.uri}`)
  })
})
