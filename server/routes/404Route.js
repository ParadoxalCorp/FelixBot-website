module.exports = [
	{
		method: "GET",
		path: "/{path*}",
    handler: function (request, reply) {
      reply.file('./error_template.html').code(404);
    },
		config: {
			description: "Error   	Page",
			tags: ["website"],
		},
	},
];