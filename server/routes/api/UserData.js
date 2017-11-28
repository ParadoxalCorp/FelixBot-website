const Joi = require('joi');
const Boom = require("boom");
const wrapper = require("../../config/botWrapperConfig");
const _ = require("underscore");

module.exports = [
	{
		method: 'GET',
		path: '/api/mutualGuilds',
		config: {
			validate: {
				query: {
					userID: Joi.number().min(100000000000000000).max(999999999999999999).required().raw(),
					Guilds: Joi.boolean().optional(),
					gSets : Joi.boolean().optional(),
					CDs : Joi.boolean().optional(),
					pSets : Joi.boolean().optional(),
					uInfo : Joi.boolean().optional()
				},
				failAction: function (request, reply, source, error) {
					if (error) {
						reply(Boom.badRequest('invalid query'));
					}
				}
			},
			handler: function (request, reply) {
				const user = request.query.userID;
				const bGuilds = request.query.Guilds;
				const gSets = request.query.gSets;
				const CDs = request.query.CDs;
				const pSets = request.query.pSets;
				const uInfo = request.query.uInfo;
				wrapper.getUser(user).then((x) => {
					const obj = (_.clone(x));
					obj["userinfo"] = obj.mutualGuilds[0].members.find((x) => x.id === user);
					delete obj.userinfo.nick;
					delete obj.userinfo.roles;
					delete obj.userinfo.voiceState;
					delete obj.userinfo.joinedAt;
					if (bGuilds) { delete obj.mutualGuilds; }
					if (gSets) { delete obj.generalSettings; }
					if (CDs) { delete obj.cooldowns; }
					if (pSets) { delete obj.dataPrivacy; }
					if (uInfo) { delete obj.userinfo; }
					return reply(obj);
				}).catch((() => reply(Boom.serverUnavailable("The Felix bot is down."))));
			}
		}
	}
];
