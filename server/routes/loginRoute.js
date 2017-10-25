const configs = require("../config/_configs")

module.exports = [
	{
		method: ['GET', 'POST'],
		path: `${configs.auth.loginUrl}/{param*}`,
		config: {
			// Use the 'oauth' auth strategy to allow bell to handle the oauth flow.
			auth: 'discord',
			handler: function (request, reply) {
				if (request.auth.isAuthenticated) {
					request.cookieAuth.clear()
					request.cookieAuth.set(request.auth.credentials.profile);
					//console.log( request.cookieAuth )
					return reply.redirect('/dashboard')
				}

				reply.redirect('/').code(401);
			}
			// if (!request.auth.isAuthenticated) {
			// 	//return reply('Authentication failed due to: ' + request.auth.error.message);
			// 	console.log(request.auth.error.message)
			// 	return reply.redirect('/', { err: request.auth.error.message });
			// } else {

			// Perform any account lookup or registration, setup local session,
			// and redirect to the application. The third-party credentials are
			// stored in request.auth.credentials. Any query parameters from
			// the initial request are passed back via request.auth.credentials.query.
			// 	const user = request.auth.credentials.profile
			// 	const data = {
			// 	username: user.username,
			// 	email: user.email,
			// 	user_id: user.id
			// }
			//request.cookieAuth.set(data)
			//request.auth.session.clear();
			//console.log(data)
			//request.auth.session.set(request.auth.credentials.profile);
			//console.log('im in login route ' + request.cookieAuth.set(data))



			//console.log ( request.auth.credentials )

			//return reply.redirect('/dashboard')
			//return reply.view('dashboard', data);
		}

	}
];