"use strict";

module.exports = [
  {
    method: "GET",
    path: "/imgs/{param*}",
    config: {
      description: "imgs		Assets",
      handler: {
        directory: {
          path: "./public/assets/images",
          listing: false,
          index: false,
        },
      },
    },
  },
  {
    method: "GET",
    path: "/js/{param*}",
    config: {
      description: "js		Assets",
      handler: {
        directory: {
          path: "./public/assets/js",
          listing: false,
          index: false,
        },
      },
    },
  },
  {
    method: "GET",
    path: "/jQuery/{param*}",
    config: {
      description: "jQuery		Assets",
      handler: {
        directory: {
          path: "./node_modules/jquery/dist/",
          listing: false,
          index: false,
        },
      },
    },
  },
  {
    method: "GET",
    path: "/css/{param*}",
    config: {
      description: "css		Assets",
      handler: {
        directory: {
          path: "./public/assets/css",
          listing: false,
          index: false,
        },
      },
    },
  },
  {
    method: "GET",
    path: "/favicon/{param*}",
    config: {
      description: "favicon 	Assets",
      handler: {
        directory: {
          path: "./public/assets/favicon",
          listing: false,
          index: false,
        },
      },
    },
  },
  {
    method: "GET",
    path: "/semantic/{param*}",
    config: {
      description: "semantic	Assets",
      handler: {
        directory: {
          path: "./public/assets/semantic",
          listing: false,
          index: false,
        },
      },
    },
  },
  {
    method: "GET",
    path: "/robots.txt",
    handler: function (request, reply) {
      reply.file('./public/robots.txt');
    },
  },
];
