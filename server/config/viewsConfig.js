module.exports = {
  engines: { 
    html: require('handlebars') 
  },
  compileOptions: {
    pretty: true
  },
  path: process.cwd() + '/public/templates',
  partialsPath: process.cwd() + '/public/templates/partials',
  helpersPath: process.cwd() + '/public/templates/helpers'
}