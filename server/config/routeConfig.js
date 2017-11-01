module.exports = [].concat(
  require("../routes/website/indexRoute"),
  require("../routes/website/assetsRoute"),
  require("../routes/website/loginRoute"),
  require("../routes/website/logoutRoute"),
  require("../routes/website/dashboardRoute"),
  require("../routes/api/postTestRoute"),
  require("../routes/api/getTestRoute")
)