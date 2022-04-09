const {DataTypes} = require('sequelize');

module.exports = sequelize => {
    sequelize.define('Orders', {
        country: {
            type: DataTypes.STRING
        },
        province: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        postalcode: {
            type: DataTypes.STRING,
        },
        direction: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        total: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM('Cart', 'In progress', 'Rejected', 'Complete')
        }
    });
};