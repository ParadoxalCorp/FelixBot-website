module.exports = [
  {
    method: 'GET',
    path: '/logout',
    config: {
      auth: {
        mode: 'try',
        strategy: 'session',
      }
    },
    handler: function (request, reply) {
      // Clear the cookie
      request.cookieAuth.clear();
      return reply.redirect('/');
    }
  }
]