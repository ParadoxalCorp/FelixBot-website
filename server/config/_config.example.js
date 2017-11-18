module.exports = {
  isSecure: true, // if there is https or not on the server
  host: "", // the websites address 
  port: 3000,
  auth: {
    loginUrl: "/discord",
    bellAuth : {
      clientSecret: "",
      clientId: "",
      authCookiePass: "", // min 32 char long
      scope : ['email', 'guilds', 'connections', 'identify']
    },
    cookieAuth : {
      authCookiePass: "", // min 32 char long
      cookieName: "", // sets the cookies name
      isSameSite: "" // should be "Lax" to satisfy chromes security
    },
  }
}