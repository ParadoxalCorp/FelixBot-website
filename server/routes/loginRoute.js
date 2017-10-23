module.exports = [
	{
		method: ['GET', 'POST'],
		path: '/discord',
		config: {
			auth: 'discord',
			handler: function (request, reply) {
				if (!request.auth.isAuthenticated) {
					//return reply('Authentication failed due to: ' + request.auth.error.message);
					return reply.redirect('/');
				}

				// Perform any account lookup or registration, setup local session,
				// and redirect to the application. The third-party credentials are
				// stored in request.auth.credentials. Any query parameters from
				// the initial request are passed back via request.auth.credentials.query.
				console.log(request.auth.credentials)


				return reply.redirect('/dashboard');
			}
		}
	}
];