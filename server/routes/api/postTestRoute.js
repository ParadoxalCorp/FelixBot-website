const Joi = require('joi');
const Boom = require('boom');

module.exports = [
	{
		method: 'POST',
		path: '/api/test',
		config: {
			auth: {
				strategy: 'session',
				mode: 'required'
			},
			validate: {
				payload: {
					number: Joi.number().required()
				},
				failAction: function (request, reply, source, error) {
					if (error) {
						reply(Boom.badRequest('invalid query'));
					}
					
				}
			}
		},
		handler: function (request, reply) {
			
			const data = {
				number: request.payload.number * 3.14
			};
			
			console.log(this.configs.port);
			
			
			return reply(data);
		}
	}
];
