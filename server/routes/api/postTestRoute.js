const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/api/test',
    handler: function (request, reply) {
      const payload = request.payload
      //console.log(payload.number)

      const schema = {
        number: Joi.number()
      };

      const result = Joi.validate({ number: payload.number }, schema);

      //console.log( result )

      const returnedMath = (result.error === null) ?
        payload.number * 100 :
        "the input is not a number"

      return reply(returnedMath);
    }
  }
];