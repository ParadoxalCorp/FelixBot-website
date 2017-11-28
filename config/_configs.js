module.exports = {
	isSecure: true, // if there is https or not on the server
	host: "felix-bot.xyz", // the websites address 
	port: 3000,
	auth: {
		loginUrl: "/discord",
		bellAuth: {
			clientSecret: "WedSa7yfF7MkotfpNO8XH2uj2I_xfUSM",
			clientId: "281149381829459968",
			authCookiePass: "cookie_encryption_password_secure", // min 32 char long
			scope: ['email', 'guilds', 'connections', 'identify']
		},
		cookieAuth: {
			authCookiePass: "cookie_encryption_password_secure", // min 32 char long
			cookieName: "discord", // sets the cookies name
			isSameSite: "Lax" // should be "Lax" to satisfy chromes security
		},
	},
	bot_api: {
		base_url: "http://DESKTOP-Karen:8080",
		token: "wf_tl23RC4A_qvC5H90_8xq5o.fJU8FPzqR0$9Gg$Q303_57$9.4dDWqFM076uU2JVCMXzf_41I.3070frdu7u-GlQH99$J896Dk.nItiIQV71z0TW962I7$34m5Y.13i0L00Bt08A41544r2Q0gg9.YXx50kQoe3KSpR81x1516y2O.5$7cZ0bJg9G83O1f92lip4hF.I28D7zB52m37$fi6HhF2Vgu9.8WoE2243da38lPOt93lXte-P.1w5IE62K9"
	}
};
