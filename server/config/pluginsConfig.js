"use strict";


module.exports = [
	{ register: require("inert") },
	{ register: require("scooter") },
	{ register: require('bell') },
	{ register: require('hapi-auth-cookie') },
	{ register: require('hapi-error')},
	{
		register: require("blankie"),
		options: {
			styleSrc: ['self', 'https://fonts.googleapis.com', 'unsafe-inline'],
			fontSrc: ['self', 'https://fonts.gstatic.com', 'data:'],
			scriptSrc: ['self', 'unsafe-inline'],
			imgSrc : ['self', 'https://cdn.discordapp.com', 'https://semantic-ui.com', 'https://discordapp.com'],
			generateNonces: false
		}
	},
	{ register: require("vision") },
	{
		register: require("blipp"),
		options: { showAuth : true },
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
