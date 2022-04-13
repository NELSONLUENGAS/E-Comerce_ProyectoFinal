const {DataTypes} = require('sequelize');

module.exports = sequelize => {
    sequelize.define('Orders', {
        country: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING,
        },
        name:{
            type: DataTypes.STRING,
        },
        lastname:{
            type: DataTypes.STRING,
        },
        direction:{
            type:DataTypes.JSON(),
        },
        total: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM('Cart', 'In progress', 'Rejected', 'Complete')
        }
    }, {
        timestamps: true
    });
};