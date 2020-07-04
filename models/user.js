const bcrypt = require("bcrypt");
const _ = require("underscore");

module.exports = function (sequelize, DataType) {
	let model = sequelize.define(
		"user",
		{
			name: {
				type: DataType.STRING,
				validate: {
					len: [3],
				},
			},
			email: {
				type: DataType.STRING,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			phone: { type: DataType.INTEGER(11).ZEROFILL },
			type: {
				type: DataType.ENUM,
				allowNull: false,
				values: ["student", "staff", "visitors", "admin"],
			},
		},
		{
			hooks: {
				beforeValidate: function (user, options) {
					// convert email to lower case and trim
					if (user.email) {
						user.email = user.email.toLowerCase().trim();
					}
				},
			},
		}
	);

	/*
	 * verify user password using bcrypt compare
	 * @param {String} password the user password
	 * @return {Boolean} <Promise> true if password matches hash
	 */
	model.prototype.verifyPassword = async function (password) {
		let adminInfo = await this.getUserAdminAccessInfo();
		try {
			return await bcrypt.compare(password, adminInfo.hash);
		} catch (error) {
			console.log(error);
		}
	};

	model.prototype.toPublicJSON = function () {
		// ommit some fields
		return _.omit(this.toJSON(), "salt", "hash", "password");
	};

	return model;
};
