const {DataTypes, UUID, UUIDV4} = require('sequelize');

module.exports = sequelize => {
    sequelize.define('Products', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
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
        }
    });
};