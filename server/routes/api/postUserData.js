const wrapper = require("../../config/botWrapperConfig");
const Boom = require("Boom");

module.exports = [{
    method: 'POST',
    path: '/api/userData',
    handler: function(request, reply) {
        const success = {
            "message": "Data has been updated",
            "statusCode": 200
        };

        wrapper.postUser(request.payload).then((data) => {
            //console.log('returned', data);
            if (data.id) return reply(success).code(200);
        }).catch(() => { return reply(Boom.serverUnavailable("The Felix bot is down.")) });
    }
}];