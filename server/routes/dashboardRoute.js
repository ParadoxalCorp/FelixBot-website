module.exports = [
  {
    method: 'GET',
    path: '/dashboard',
    config: {
      handler: function (request, reply) {
        reply.view('index', {
          title: 'This will become the dasboard page',
          message: 'SoonTM'
        })
      },
    }
  }
];