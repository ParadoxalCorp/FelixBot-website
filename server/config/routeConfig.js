module.exports = [].concat(
  require( "../routes/indexRoute" ), 
  require( "../routes/assetsRoute" ),
  require( "../routes/404Route" )
)