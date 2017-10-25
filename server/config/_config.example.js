module.exports = {
  isSecure: false, // if there is https or not on the server
  host: "dummy.com",
  auth: {
    failedLoginUrl : "/",
    bellAuth : {
      clientSecret: "WedSa7yfF7MkotfpNO8XH2uj2I_xfUSM",
      clientId: "281149381829459968",
      authCookiePass: "cookie_encryption_password_secure", // min 32 char long
    },
    cookieAuth : {
      authCookiePass: "cookie_encryption_password_secure", // min 32 char long
      cookieName: "discord" // sets the cookies name
    },
  }
}