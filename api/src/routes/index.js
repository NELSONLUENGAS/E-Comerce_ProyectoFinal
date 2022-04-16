//////////////////////////////////////////////////////////////////////////////////
const { Router } = require('express');
const router = Router();

//////////////////////////////////////////////////////////////////////////////////
const productsRoute = require('./Products');
const categoriesRoute = require('./Categories');
const usersRoute = require('./Users');
const mercadoPagoRoute = require('./Mercadopago');
const ordersRoute = require('./Orders')
const wishlistRoute = require('./Wishlist');
const reviewsRoute = require('./Review')


//////////////////////////////////////////////////////////////////////////////////
router.use('/', usersRoute);
router.use('/', productsRoute);
router.use('/', categoriesRoute);
router.use('/', mercadoPagoRoute);
router.use('/', ordersRoute)
router.use('/', wishlistRoute);
router.use('/', reviewsRoute)

//////////////////////////////////////////////////////////////////////////////////
module.exports = router;