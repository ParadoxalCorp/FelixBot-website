module.exports = [].concat(
  require( "../routes/indexRoute" ), 
  require( "../routes/assetsRoute" ),
  require( "../routes/loginRoute" ),
  require( "../routes/logoutRoute" ),
  require( "../routes/dashboardRoute" )
)