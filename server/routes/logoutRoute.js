module.exports = [
  {
    method: 'GET',
    path: '/logout',
    config: {
      handler: function (request, reply) {
        // Clear the cookie
        request.auth.session.clear();

        return reply.redirect('/');
      }
    }
  }
]