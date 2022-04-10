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
router.get('/users/orders', async (req, res) => {
    const {email} = req.params

    const history = await Orders.findAll({where: 
        { status: { [Op.ne]: 'Cart' } }, 
        include: {model: Products}
    })

    if(history.length) res.send(history)
    else res.status(404).send('No hay ordenes creadas')
})

router.get('/orders', async (req, res, next)=> {
    try{
        const orders = await Orders.findAll({
            include: {model: Products}
        })
        res.send(orders)
    }catch(err){
        next(err);
    }
})

router.get('/users/:email/orders', async (req, res) => {
    const {email} = req.params

    const history = await Orders.findAll({where:  
        { UserEmail: {
            [Op.iLike]:`%${email}%`
            }
        }, 
        include: {model: Products}
    })
    if(history.length) res.send(history)
    else res.status(404).send('History not found')
})

router.get('/users/:email/order', async (req, res) => {
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
        const [cart, created] = await Orders.findOrCreate({where: {UserEmail: email, status: 'Cart'}})

        if(!created){
            const relation = await Product_Line.findOne({where: {ProductId: productId, OrderId: cart.id}})

            if(relation){
                relation.amount += amount
                await relation.save()
            }
            else {
                const product = await Products.findOne({where: {id: productId}})
                await cart.addProduct(product, {through: {amount, price: product.price}})   
            }
        }

        res.send(cart)
    }
    catch(e) {
        res.status(500).send(`${e}`)
    }
})


router.put('/users/:email/cart', async (req, res) => {
    const {productId, amount} = req.body, {email} = req.params

    try {
        const cart = await Orders.findOne({where: {UserEmail: email, status: 'Cart'}})
        const productLine = await Product_Line.findOne({where:{ProductId: productId}})
        console.log(productId)
        console.log(amount)
        if(productLine){
            switch(amount){
                case 'Increment':
                    console.log('entre')
                    productLine.amount+=1
                    break;
                case 'Decrement':
                    productLine.amount-=1
                    break;
                default: return res.status(500).send('An unknown value was entered')
            }
        await productLine.save()
        res.send(productLine)
        } else res.status(404).send('Relation not Found')

    //     if(amount>0){
    //         productLine.amount+=1
    //     }else {
    //         if(productLine.amount>1){
    //         productLine.amount-=1
    //     }
    //     }
    //         await productLine.save()
    //         res.send(productLine)
    }
    catch(e){
        res.status(500).send(`${e}`)
    }

})
router.put('/users/:email/changeStatusCart', async (req, res) => {
    const {email} = req.params

    try {
        const cart = await Orders.findOne({
            where: {UserEmail: email, status: 'Cart'},
            include:{model: Products}
            })
        

            if(cart){
                cart.Products.map( async product => {
                    product.stock = product.stock - product.Product_Line.amount
                    await product.save()
                })
                cart.status = 'In progress'
                await cart.save()
                await Orders.findOrCreate({where: {UserEmail: email, status: 'Cart'}})
                return res.send('El status ha cambiado correctamente')
            } else res.status(404).send('Cart not found')
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

router.delete('/users/:email/emptycart', async (req, res) => {
    const {email} = req.params
    try {
        const cart = await Orders.findOne({where: {UserEmail: email, status: 'Cart'}})

        if(cart){
            // const items = await Product_Line.findAll({where: {OrderId: cart.id}})

            // if(items.length) {
                await cart.destroy()
                await Orders.findOrCreate({where: {UserEmail: email, status: 'Cart'}})
                res.send('The cart has been emptied')

            // }
            // else res.send('The cart is currently empty')
        }
        else res.status(404).send('Cart not found')
    }
    catch(e) {
        res.status(500).send(`${e}`)
    }
})


module.exports = router;