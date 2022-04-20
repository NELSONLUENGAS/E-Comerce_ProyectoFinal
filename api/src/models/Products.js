const {DataTypes, UUID, UUIDV4} = require('sequelize');

module.exports = sequelize => {
    sequelize.define('Products', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        discount: {
            type: DataTypes.FLOAT,
            defaultValue: 1.0
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
        }
    });
};