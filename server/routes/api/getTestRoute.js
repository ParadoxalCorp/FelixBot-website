module.exports = [
  {
    method: 'GET',
    path: '/api/test',

    handler: function (request, reply) {

      return reply('hello world');
    }
  }
];