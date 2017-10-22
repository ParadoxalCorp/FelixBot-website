"use strict";

module.exports = [
	{
		method: "GET",
		path: "/imgs/{param*}",
		config: {
			handler: {
				directory: {
					path: "./public/assets/images",
					listing: false,
					index: false,
				},
			},
			description: "imgs		Assets",
		},
	},
	{
		method: "GET",
		path: "/js/{param*}",
		config: {
			handler: {
				directory: {
					path: "./public/assets/js",
					listing: false,
					index: false,
				},
			},
			description: "js		Assets",
		},
	},
	{
		method: "GET",
		path: "/css/{param*}",
		config: {
			handler: {
				directory: {
					path: "./public/assets/css",
					listing: false,
					index: false,
				},
			},
			description: "css		Assets",
		},
	},
	{
		method: "GET",
		path: "/favicon/{param*}",
		config: {
			handler: {
				directory: {
					path: "./public/assets/favicon",
					listing: false,
					index: false,
				},
			},
			description: "favicon 	Assets",
		},
	},
	{
		method: "GET",
		path: "/semantic/{param*}",
		config: {
			handler: {
				directory: {
					path: "./public/assets/semantic",
					listing: false,
					index: false,
				},
			},
			description: "semantic	Assets",
		},
	}
];