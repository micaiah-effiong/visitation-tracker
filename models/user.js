module.exports = function (sequelize, DataType) {
	let user = sequelize.define("user", {
		firstname: {
			type: DataType.STRING,
			validate: {
				len: [3],
			},
		},
		lastname: {
			type: DataType.STRING,
			validate: {
				len: [3],
			},
		},
		email: {
			type: DataType.STRING,
			validate: {
				isEmail: true,
			},
		},
		phone: { type: DataType.INTEGER(11).ZEROFILL },
		type: {
			type: DataType.ENUM,
			values: ["student", "staff", "visitors", "admin"],
		},
	});
};
