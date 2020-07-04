module.exports = function (sequelize, DataType) {
	let model = sequelize.define("visit", {
		email: {
			type: DataType.STRING,
			validate: {
				isEmail: true,
			},
		},
		purpose: {
			type: DataType.STRING,
			validate: {
				len: [8],
			},
		},
		directedTo: {
			type: DataType.STRING,
			validate: {
				len: [8],
			},
		},
	});

	return model;
};
