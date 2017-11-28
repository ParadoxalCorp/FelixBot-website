module.exports = {
  engines: { html: require('handlebars') },
  compileOptions: {
    pretty: false
  },
  path: process.cwd() + '/public/templates', // eslint-disable-line no-undef
  partialsPath: process.cwd() + '/public/templates/partials', // eslint-disable-line no-undef
  helpersPath: process.cwd() + '/public/templates/helpers' // eslint-disable-line no-undef
};