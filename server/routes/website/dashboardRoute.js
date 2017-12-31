module.exports = [
	{
		method: ['GET'],
		path: '/dashboard',
		config: {
			description: "Dashboard for users",
			auth: {
				strategy: 'session',
				mode: 'required',
			},
		},
		handler: function (request, reply) {
			const context = {
				session: request.auth.credentials,
			};

			reply.view('dashboard', {
				title: 'Dashboard',
				context: context,
			});
		},
	},
];
