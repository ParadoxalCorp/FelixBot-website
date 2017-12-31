const Boom = require("boom");
const wrapper = require("../../config/botWrapperConfig");

module.exports = [{
	method: 'POST',
	path: '/api/guildData',
	config: {
		description: "Dashboard post api",
		auth: {
			strategy: 'session',
			mode: 'required',
		},
	},
	handler: function (request, reply) {
		const success = {
			"message": "Data has been updated",
			"statusCode": 200,
		};

		wrapper.postGuild(request.payload).then((data) => {
			if (data.id) return reply(success).code(200);
		}).catch(() => reply(Boom.serverUnavailable("The Felix bot is down.")));
	},
}];
