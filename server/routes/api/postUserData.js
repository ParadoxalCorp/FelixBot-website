const wrapper = require("../../config/botWrapperConfig");
const Boom = require("boom");

module.exports = [{
  method: 'POST',
  path: '/api/userData',
  config: {
    description: "Dashboard post api",
    auth: {
      strategy: 'session',
      mode: 'required',
    },
  },
  handler: function (request, reply) {
    const success = {
      "message": "Data has been updated",
      "statusCode": 200,
    };

    wrapper.postUser(request.payload).then((data) => {
      // console.log('returned', data);
      if (data.id) return reply(success).code(200); // eslint-disable-line promise/always-return
    }).catch(() => reply(Boom.serverUnavailable("The Felix bot is down.")));
  },
}];
