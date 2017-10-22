"use strict"
const Hapi = require("hapi")
const server = new Hapi.Server()
const configs = require("./server/config/hapi-prv")

server.connection({
  port: 3000,
  host: "localhost",
  labels: ["website"]
})

server.register(configs.plugins, () => {
  
  server.views(configs.views);
  
  server.route(configs.routes);
  
  server.start(() => 
    server.log('info', ` The servers uri is    ${server.info.uri}`)
  )
})


