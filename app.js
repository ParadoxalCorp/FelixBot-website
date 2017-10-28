"use strict"
const Hapi = require("hapi")
const server = new Hapi.Server()
const configs = require("./server/config/hapi-prv")


server.connection({
  port: 3000,
  host: configs._config.host,
  labels: ["website"],
  router: {
    stripTrailingSlash: true,
  }
})

server.register(configs._plugins, () => {

  server.auth.strategy('discord', 'bell', configs._auth )
  
  server.views(configs._views);
  
  server.route(configs._routes);
  
  server.start(() => 
    server.log('info', ` The servers uri is    ${server.info.uri}`)
  )
})


// Use express, not hapi! 'hapi' succs <3
