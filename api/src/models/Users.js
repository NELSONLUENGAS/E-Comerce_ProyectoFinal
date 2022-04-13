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
        directions: {
            type: DataTypes.ARRAY(DataTypes.JSON()),
            allowNull: false
        },
        principalDirection: {
            type: DataTypes.JSON(),
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
