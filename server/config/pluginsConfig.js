"use strict";

module.exports = [
	{ register: require("inert") },
	{ register: require("scooter") },
	{ register: require('hapi-error') },
	{ register: require('bell') },
	{ register: require('hapi-auth-cookie') },
	{
		register: require('hapi-robots'),
		options: {
			// set to true to use server.log to report info about robots.txt and remote attempts to access it:
			debug: false,
			envs: {
				production: {
					// will disallow *all* robots from the path '/noDroidsAllowed':
					'*': ['/noDroidsAllowed'],
					// will disallow robot 'R2D2' from the indicated paths:
					'R2D2': ['/noDroidsAllowed', '/noR2D2Here']
				},
				stage: {
					// will disallow everyone from every path:
					'*': ['/'],
					// except for chuck, chuck is awesome:
					'chuck': []
				},
				// use '*' to match match any other env that isn't listed above:
				'*': ['/']
			},
			// tell hapi-robots which of the above envs to use:
			env: 'production'
		},
	},
	{
		register: require("blankie"),
		options: {
			styleSrc: ['self', 'https://fonts.googleapis.com', 'unsafe-inline'],
			fontSrc: ['self', 'https://fonts.gstatic.com', 'data:'],
			scriptSrc : ['self', 'unsafe-inline'],
			generateNonces: false
		}
	},
	{ register: require("vision") },
	{
		register: require("blipp"),
		options: {},
	},
	{
		register: require("good"),
		options: {
			ops: { interval: 15000 },
			reporters: {
				console: [
					{
						module: "good-squeeze",
						name: "Squeeze",
						args: [{ format: 'YYYY-MM-DDTHH:mm:ss.SSS[]', log: "*", response: "*", error: "*", request: "*" }],
					},
					{
						module: "good-console",
						args: [{ format: 'YYYY-MM-DDTHH:mm:ss.SSS[]' }]
					},
					"stdout",
				],
			},
		},
	},
];
