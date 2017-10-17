"use strict"
const Hapi = require("hapi")
const server = new Hapi.Server();
const configs = require("./server/config/configs")

server.connection({
  port: 3000,
  host: "localhost",
  labels: ["website"]
});

server.register(configs.plugins, (err) => {
  if (err) { return console.error(err); }

  server.views(configs.views);

  server.route(configs.routes);

  server.start((err) => { // eslint-disable-line no-shadow
    if (err) { throw err; }
    console.info(`Server started at ${server.info.uri}`);
  });

});
