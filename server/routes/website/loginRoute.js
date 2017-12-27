module.exports = [
  {
    method: ['GET'],
    path: `/discord/{param*}`,
    config: {
      description: "Users gets logged in",
      auth: {
        mode: 'try',
        strategy: 'discord',
      },
      handler: function (request, reply) {
        if (!request.auth.isAuthenticated) {
          return reply.redirect('/');
        }

        const profile = request.auth.credentials.profile;
        request.cookieAuth.set({
          username: profile.username,
          user_id: profile.id,
          image_id: profile.avatar.id,
          image_link: profile.avatar.url,
        });
        reply.redirect('/dashboard');
      },
    },
  },
];
