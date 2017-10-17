module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: function (request, reply) {
        reply.view('index', {
          title: 'Homepage',
          message: 'Hello World'
        })
      },
    }
  }
];