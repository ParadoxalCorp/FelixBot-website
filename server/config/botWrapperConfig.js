const botWrapper = require("felix-wrapper");
const { bot_api } = require("../../config/_configs");

const wrapper = new botWrapper({
	url: bot_api.base_url,
	token: bot_api.token,
	timeout: 1000,
	autoConversion: false,
});

module.exports = wrapper;
