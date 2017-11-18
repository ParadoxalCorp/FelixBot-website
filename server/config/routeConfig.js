const website = [].concat(
  require("../routes/website/indexRoute"),
  require("../routes/website/assetsRoute"),
  require("../routes/website/loginRoute"),
  require("../routes/website/logoutRoute"),
  require("../routes/website/dashboardRoute")
)

const api = [].concat(
  require("../routes/api/postTestRoute"),
  require("../routes/api/getTestRoute")
)

module.exports = [].concat(website, api)

