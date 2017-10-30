"use strict"
const Hapi = require("hapi")
const server = new Hapi.Server()
const configs = require("./server/config/_exported-configs")

server.connection({
  port: 3000,
  host: configs._config.host,
  labels: ["website"],
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


