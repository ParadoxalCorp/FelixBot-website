const configs = require("../../config/_configs")

module.exports = [
	{
		method: ['GET', 'POST'],
		path: `${configs.auth.loginUrl}/{param*}`,
		config: {
			auth: {
				mode: 'try',
				strategy: 'discord',
			},
			handler: function (request, reply) {
				if (!request.auth.isAuthenticated) {
					return reply.redirect('/');
				}

				const username = request.auth.credentials.profile.username
				request.cookieAuth.set({ username });
				reply.redirect('/dashboard');
			}
		}
	}
];