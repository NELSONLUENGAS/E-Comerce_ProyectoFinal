const {DataTypes} = require('sequelize');

module.exports = sequelize => {
    sequelize.define('Product_Line', {
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        amount: {
            type: DataTypes.INTEGER,
        }
    });
};