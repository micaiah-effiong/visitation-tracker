const bcrypt = require("bcrypt");
const _ = require("underscore");
const errorResponse = require("../handlers/error-response");

module.exports = function (sequelize, DataType) {
	let model = sequelize.define(
		"userAdminAccessInfo",
		{
			password: {
				type: DataType.VIRTUAL,
				allowNull: false,
				validate: {
					len: [8, 100],
				},
			},
			salt: {
				type: DataType.STRING,
			},
			hash: {
				type: DataType.STRING,
			},
		},
		{
			hooks: {
				beforeCreate: async function (instance, options) {
					await hashPassword(instance, options);
				},
			},
		}
	);

	return model;
};

async function hashPassword(instance, options) {
	/*
	 * Before creating instance generate salt and hash password
	 */
	if (!instance.password) return;
	try {
		const { password } = instance;
		const _salt = await bcrypt.genSalt(10);
		const _hash = await bcrypt.hash(password, _salt);
		instance.setDataValue("password", password);
		instance.setDataValue("salt", _salt);
		instance.setDataValue("hash", _hash);
	} catch (error) {
		return error;
	}
}
