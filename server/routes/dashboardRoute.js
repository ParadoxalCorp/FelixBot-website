module.exports = [
  {
    method: ['GET', 'POST'],
    path: '/dashboard',
    config: {  // try with redirectTo disabled makes isAuthenticated usefully available
      auth: {
        strategy: 'session',
        mode: 'try'
      },
      //plugins: { 'hapi-auth-cookie': { redirectTo: false } }
    },
    handler: function (request, reply) {
      // let context = {
      //   session: {},
      // };

      if (request.auth.isAuthenticated) {
        console.log('test')
        console.log(request.auth.credentials)
      }
      console.log( request.auth.credentials.profile.id )

      // console.log(context)

      //console.log(JSON.stringify(request.auth.credentials))


      reply.view('dashboard')
    },
  }
];