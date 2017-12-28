/**
 * This was made before the felixWrapper
 * Might not ever be used
 */

const EventEmitter = require("events").EventEmitter;
const unirest = require('unirest');
const body = new EventEmitter();

const get_noToken = (uri) => {
  unirest.get(uri)
    .end(function (response) {
      body.data = response.body;
      body.emit('update');
    });
};

const get_Token = (uri, token) => {
  unirest.get(uri)
    .headers({
      'Authorization': `Bearer ${token}`,
    })
    .end(function (response) {
      body.data = response.body;
      body.emit('update');
    });
};

const post_noToken = (uri, data) => {
  unirest.post(uri)
    .headers({
      'Content-Type': 'application/json',
    })
    .send(JSON.stringify(data))
    .end((response) => {
      body.poost = response;
      body.emit('update');
    });
};

const post_Token = (uri, token, data) => {
  unirest.post(uri)
    .headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    })
    .send(JSON.stringify(data))
    .end((response) => {
      body.post = response;
      body.emit('update');
    });
};

module.exports = {
  requester: {
    get: {
      wToken: get_Token,
      woToken: get_noToken,
    },
    post: {
      wToken: post_Token,
      woToken: post_noToken,
    },
  },
  body,
};
