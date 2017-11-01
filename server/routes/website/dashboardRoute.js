module.exports = [
  {
    method: ['GET', 'POST'],
    path: '/dashboard',
    config: {
      auth: {
        strategy: 'session',
        mode: 'required'
      },
    },
    handler: function (request, reply) {
      const context = {
        session: request.auth.credentials,
      };

      reply.view('dashboard', {
        title: 'Dashboard', 
        context : context
      });
    },
  }
];