const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('review', {
		title: {
			type: DataTypes.STRING,
			alloNull: false,
		},
		rate: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
				max: 5,
				isNumeric: true,
			},
		},
		content: {
			type: DataTypes.TEXT,
			alloNull: false,
		},
	});
};

