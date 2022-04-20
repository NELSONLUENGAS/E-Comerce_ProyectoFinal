const {DataTypes} = require('sequelize');

module.exports = sequelize =>{
    sequelize.define('Views', {
        ref:{
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }, 
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        image: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        description: {
            type: DataTypes.TEXT
        },
        UserEmail: {
            type: DataTypes.STRING
        }
    })
}