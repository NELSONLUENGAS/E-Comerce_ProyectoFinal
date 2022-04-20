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
const reviewsRoute = require('./Review')
const authsRoute = require('./Auths');
const ViewsRoute = require('./Views');

//////////////////////////////////////////////////////////////////////////////////
router.use('/', usersRoute);
router.use('/', productsRoute);
router.use('/', categoriesRoute);
router.use('/', mercadoPagoRoute);
router.use('/', ordersRoute)
router.use('/', orderWishlistRoute);
router.use('/', reviewsRoute);
router.use('/',authsRoute);
router.use('/', ViewsRoute);
//////////////////////////////////////////////////////////////////////////////////
module.exports = router;