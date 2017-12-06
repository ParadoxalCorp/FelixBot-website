module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      description: "Homepage",
      auth: {
        mode: 'try',
        strategy: 'session',
      }
    },
    handler: function (request, reply) {
      const context = {
        session: {},
      };

      if (request.auth.isAuthenticated) {
        context.session = request.auth.credentials;
      }

      reply.view('index', {
				title: 'Homepage',
        message: 'Hello World',
        context : context
      });
    }
  }
];
