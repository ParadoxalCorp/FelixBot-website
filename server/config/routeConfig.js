const website = [].concat(
	require("../routes/website/indexRoute"),
	require("../routes/website/assetsRoute"),
	require("../routes/website/loginRoute"),
	require("../routes/website/logoutRoute"),
	require("../routes/website/dashboardRoute")
);

const api = [].concat(
	require("../routes/api/getUserData"),
	require("../routes/api/postGuildData"),
	require("../routes/api/postUserData")
);

module.exports = [...api, ...website];

