const Boom = require('boom');
const Joi = require('joi');

module.exports = [
	{
		method: 'POST',
		path: '/api/test',
		config: {
			validate: {
				payload: {
					number: Joi.number().required(),
				},
				failAction: function (request, reply, source, error) {
					if (error) {
						reply(Boom.badRequest('invalid query'));
					}
				},
			},
		},
		handler: function (request, reply) {
			const data = {
				number: request.payload.number * Math.PI,
			};
			return reply(data);
		},
	},
];
