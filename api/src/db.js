//////////////////////////////////////////////////////////////////////////////////
require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

//////////////////////////////////////////////////////////////////////////////////
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`, {
  logging: false, 
  native: false,
  define: {
    timestamps: false
  } 
});
const basename = path.basename(__filename);

const modelDefiners = [];

//////////////////////////////////////////////////////////////////////////////////
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {Categories, Products, Orders, Users, Product_Line, Review} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Products.belongsToMany(Categories, {through: "products_categories"})
Categories.belongsToMany(Products, {through: "products_categories"})

Products.belongsToMany(Orders, {through: Product_Line})
Orders.belongsToMany(Products, {through: Product_Line})

Orders.belongsTo(Users)

Users.belongsToMany(Products, {through: "wishlist"})
Products.belongsToMany(Users, {through: "wishlist"})

Review.belongsTo(Users);
Products.hasMany(Review);
//////////////////////////////////////////////////////////////////////////////////
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};