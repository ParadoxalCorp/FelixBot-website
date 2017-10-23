"use strict";

module.exports = [
	{ register: require("inert") },
	{ register: require("scooter") },
	{ register: require('hapi-error') },
	{ register: require('bell') },
	{
		register: require("blankie"),
		options: {
			styleSrc: ['self', 'https://fonts.googleapis.com', 'unsafe-inline'],
			fontSrc: ['self', 'https://fonts.gstatic.com','data:', 'unsafe-inline'],
			
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
					{ module: "good-console",
						args: [{ format: 'YYYY-MM-DDTHH:mm:ss.SSS[]' }]
					},
					"stdout",
				],
			},
		},
	},
];
