module.exports = {
  isSecure: true, // if there is https or not on the server
  host: "", // the websites address
  port: 3000,
  auth: {
    bellAuth: {
      clientSecret: "",
      clientId: "",
      authCookiePass: "", // min 32 char long
      scope: ['email', 'guilds', 'connections', 'identify'],
    },
    cookieAuth: {
      authCookiePass: "", // min 32 char long
      cookieName: "", // sets the cookies name
      isSameSite: "Lax", // should be "Lax" to satisfy chromes security
    },
  },
  bot_api: {
    base_url: "", // don't make it start with /
    token: "",
  },
};
