const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/api/test',
    config: {
      auth: {
        strategy: 'session',
        mode: 'required'
      },
    },
    handler: function (request, reply) {
      const payload = request.payload
      //console.log(payload.number)
      console.log(payload)

      const schema = {
        number: Joi.number()
      };

      const result = Joi.validate({ number: payload.number }, schema);

      const returnedMath = (!(result.error === null)  ) ? "the input is not a number" : payload.number * 3.14


      return reply(returnedMath);
    }
  }
];