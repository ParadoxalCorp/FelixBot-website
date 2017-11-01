module.exports = {
  isSecure: false, // if there is https or not on the server
  host: "", // the websites address ("dummy.com" was used in testing)
  auth: {
    loginUrl: "", // the url where the POST and GET happen ("/discord" was used in tesing)
    bellAuth : {
      clientSecret: "", // client secret from the OAuth2 provider
      clientId: "", // client id from the OAuth2 provider
      authCookiePass: "" // min 32 char long
    },
    cookieAuth : {
      authCookiePass: "", // min 32 char long
      cookieName: "", // sets the cookies name
      isSameSite: "" // should be "Lax" to satisfy chromes security
    },
  }
}