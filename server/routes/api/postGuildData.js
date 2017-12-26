const wrapper = require("../../config/botWrapperConfig");
const Boom = require("boom");

module.exports = [{
	method: 'POST',
	path: '/api/guildData',
	config: {
		description: "Dashboard post api",
		auth: {
			strategy: 'session',
			mode: 'required'
		},
	},
	handler: function (request, reply) {
		const success = {
			"message": "Data has been updated",
			"statusCode": 200
		};

		wrapper.postGuild(request.payload).then(
			reply(success).code(200), () => reply(Boom.serverUnavailable("The Felix bot is down.")));
	}
}];
