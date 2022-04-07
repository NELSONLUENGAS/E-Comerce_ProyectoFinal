const { Router } = require('express');
const {Products, Orders, Product_Line} = require('../db')
const {Op} = require('sequelize');
const router = Router();

router.get('/users/:email/cart', async (req, res) => {
    const {email} = req.params

    const cart = await Orders.findOne({where: 
        { UserEmail: email, status: 'Cart' }, attributes: ['total'],
        include: { model: Products, attributes: ['name', 'image']}
    })

    if(cart) res.send(cart)
    else res.status(404).send('Cart not found')
})


router.get('/users/:email/orders', async (req, res) => {
    const {email} = req.params

    const history = await Orders.findAll({where: 
        { UserEmail: email, status: { [Op.ne]: 'Cart' } }, 
        include: {model: Products}
    })

    if(history.length) res.send(history)
    else res.status(404).send('History not found')
})


router.post('/users/:email/cart', async (req, res) => {
    const {productId, amount} = req.body, {email} = req.params
    
    try {
        const product = await Products.findOne({where: {id: productId}})
        const [cart] = await Orders.findOrCreate({where: {UserEmail: email, status: 'Cart'}})
    
        await cart.addProduct(product, {through: {amount, price: product.price}})
        res.send(cart)
    }
    catch(e) {
        res.status(500).send(`${e}`)
    }
})


router.put('/users/:email/cart', async (req, res) => {
    const {productId, amountAction} = req.body, {email} = req.params

    try {
        const cart = await Orders.findOne({where: {UserEmail: email, status: 'Cart'}})
        const productLine = await Product_Line.findOne({ProductId: productId, OrderId: cart.id})
    
        if(productLine){
            switch(amountAction){
                case 'Increment': 
                    productLine.amount += 1
                    break;
                
                case 'Decrement': 
                    productLine.amount -= 1
                    break;
                
                default: res.status(500).send('An unknown value was entered')
            }
        
            await productLine.save()
            res.send('Amount ' + amountAction)
        }
        else res.status(404).send('Relation not found')
    }
    catch(e){
        res.status(500).send(`${e}`)
    }

})

router.delete('/users/:email/cart', async (req, res) => {
    const {productId} = req.body, {email} = req.params

    try {
        const cart = await Orders.findOne({where: {UserEmail: email, status: 'Cart'}})
        const productLine = await Product_Line.findOne({ProductId: productId, OrderId: cart.id})
    
        if(productLine) {
            await productLine.destroy()
            res.send('The product was removed from cart')
        }
        else res.send('Relation not found')
    }
    catch(e){
        res.status(500).send(`${e}`)
    }
})


module.exports = router;