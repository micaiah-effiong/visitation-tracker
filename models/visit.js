module.exports = function (sequelize, DataType) {
	let user = sequelize.define("user", {
		purpose: {
			type: DataType.STRING,
			validate: {
				len: [8],
			},
		},
	});
};
