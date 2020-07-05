module.exports = function (sequelize, DataType) {
	let model = sequelize.define("visit", {
		purpose: {
			type: DataType.STRING,
			validate: {
				// len: [8],
			},
		},
	});

	return model;
};
