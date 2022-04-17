//////////////////////////////////////////////////////////////////////////////////
const { Router } = require('express');
const router = Router();

//////////////////////////////////////////////////////////////////////////////////
const productsRoute = require('./Products');
const categoriesRoute = require('./Categories');
const usersRoute = require('./Users');
const mercadoPagoRoute = require('./Mercadopago');
const ordersRoute = require('./Orders')
const orderWishlistRoute = require('./Wishlist');

//////////////////////////////////////////////////////////////////////////////////
router.use('/', usersRoute);
router.use('/', productsRoute);
router.use('/', categoriesRoute);
router.use('/', mercadoPagoRoute);
router.use('/', ordersRoute)
router.use('/', orderWishlistRoute);
//////////////////////////////////////////////////////////////////////////////////
module.exports = router;