"use strict";

module.exports = [
	{ register: require("inert") },
	{ register: require("scooter") },
	{
		register: require("blankie"),
		options: {
styleSrc: ['self', 'https://fonts.googleapis.com'],
fontSrc: ['self', 'https://fonts.gstatic.com','data:'],
objectSrc: 'self',
generateNonces: true
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
						args: [{ ops: "*", log: "*", response: "*", error: "*", request: "*" }],
					},
					{ module: "good-console" },
					"stdout",
				],
			},
		},
	},
];
