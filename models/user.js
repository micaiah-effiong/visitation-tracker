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
			gender: {
				type: DataType.ENUM,
				values: ["M", "F"],
				allowNull: false,
				set: function (value) {
					console.log(value, "set gender");
					this.setDataValue("gender", value.toUpperCase());
				},
				get: function () {
					let result;
					switch (this.getDataValue("gender")) {
						case "M":
							result = "Male";
							break;
						case "F":
							result = "Female";
							break;
					}
					return result;
				},
			},
			phone: { type: DataType.STRING(11) },
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

	model.getUserClass = function (key) {
		let userClass = { ST: "Student", SF: "Staff", VIS: "Visitor", AD: "Admin" };
		return userClass[key];
	};

	return model;
};
