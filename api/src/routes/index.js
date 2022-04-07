//////////////////////////////////////////////////////////////////////////////////
const { Router } = require('express');
const router = Router();

//////////////////////////////////////////////////////////////////////////////////
const productsRoute = require('./Products');
const categoriesRoute = require('./Categories');
const usersRoute = require('./Users');
<<<<<<< Updated upstream
=======
const mercadoPagoRoute = require('./Mercadopago');
const ordersRoute = require('./Orders')
>>>>>>> Stashed changes

//////////////////////////////////////////////////////////////////////////////////
router.use('/', usersRoute);
router.use('/', productsRoute);
router.use('/', categoriesRoute);
<<<<<<< Updated upstream
=======
// router.use('/', mercadoPagoRoute);
router.use('/', ordersRoute)
>>>>>>> Stashed changes

//////////////////////////////////////////////////////////////////////////////////
module.exports = router;