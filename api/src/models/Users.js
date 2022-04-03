const {DataTypes} = require('sequelize');

module.exports = sequelize => {
    sequelize.define('Users', {
        email: {
            type: DataTypes.STRING,
            primaryKey: true
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        birthday: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        dni: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        nationality: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        province: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        city: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        postalcode: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        direction: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true
    });
};
