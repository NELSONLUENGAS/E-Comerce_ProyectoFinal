const { Router } = require('express');
const {Products, Orders, Product_Line} = require('../db')
const {Op} = require('sequelize');
const router = Router();
const nodemailer = require('nodemailer');
const { orderShipped, orderComplete } = require('../emailMessages/ordersMails');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {   
        user: 'henrylatcom@gmail.com', 
        pass: 'osmtyqgalgnegpss',
        },
});

transporter.verify((error, success) => {
    if (error) {
        console.log("no se pudo conectar con el servidor de gmail");
    } else {
        console.log('Server is ready to take our messages');
    }
});

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

    const history = await Orders.findAll({where: 
        { status: { [Op.ne]: 'Cart' } }, 
        include: {model: Products}
    })

    if(history.length) res.send(history)
    else res.status(404).send('No hay ordenes creadas')
})
router.get('/users/orders/InProgress', async (req, res) => {

    const history = await Orders.findAll({where: 
        { status: 'In progress'}, 
        include: {model: Products}
    })

    if(history.length) res.send(history)
    else res.status(404).send('No hay ordenes en progreso')
})
router.get('/users/orders/Complete', async (req, res) => {
    const history = await Orders.findAll({where: 
        { status: 'Complete'}, 
        include: {model: Products}
    })

    if(history.length) res.send(history)
    else res.status(404).send('No hay ordenes completadas')
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
        { UserEmail: email}, 
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
        const findProduct = await Products.findOne({where: {id: productId}})

        if(!created){
            const relation = await Product_Line.findOne({where: {ProductId: productId, OrderId: cart.id}})

            if(relation){
                relation.amount += amount
                cart.total += (relation.price * amount)
                await relation.save()
                await cart.save()
            }
            else {
                const product = await Products.findOne({where: {id: productId}})
                await cart.addProduct(product, {through: {amount, price: product.price}}) 
                cart.total += (findProduct.price * findProduct.discount * amount)
                await cart.save()  
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
        const relation = await Product_Line.findOne({where:{ProductId: productId}})
        
        if(relation){
            switch(amount){
                case 'Increment':
                    relation.amount+=1
                    cart.total += relation.price
                    break;
                case 'Decrement':
                    relation.amount-=1
                    cart.total -= relation.price
                    break;
                default: return res.status(500).send('An unknown value was entered')
            }
            await relation.save()
            res.send(relation)
        } 
        else res.status(404).send('Relation not Found')

    }
    catch(e){
        res.status(500).send(`${e}`)
    }

})
router.put('/users/:email/changeStatusCart', async (req, res) => {
    const {email} = req.params
    const {name,lastname,direction} = req.body

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

                cart.direction = direction
                await cart.save()
                await Orders.findOrCreate({where: {UserEmail: email, status: 'Cart', name, lastname}})
                res.send('El status ha cambiado correctamente')
                
                await transporter.sendMail(orderShipped(email, cart))
            } else res.status(404).send('Cart not found')
        }
        catch(e){
            res.status(500).send(`${e}`)
        }
    
    })
router.put('/users/:email/changeToComplete', async (req, res) => {
        const {email} = req.params, {orderId} = req.body
        console.log(orderId);
        
        try {
            const cart = await Orders.findOne({
                where: {UserEmail: email, status: 'In progress', id: orderId},
                include: {model: Products}})
                if(cart){
                    console.log(cart)
                    cart.status = 'Complete'
                    await cart.save()
                    
                    res.send('El status ha cambiado correctamente')
                    await transporter.sendMail(orderComplete(email,cart))
                } else res.status(404).send('Cart not found')
            }
            catch(e){
                res.status(500).send(`${e}`)
            }
        
})

router.delete('/users/:email/cart', async (req, res) => {
    const {productId} = req.query, {email} = req.params
    try {
        const cart = await Orders.findOne({where: {UserEmail: email, status: 'Cart'}})
        const relation = await Product_Line.findOne({where:{ProductId: Number(productId), OrderId: cart.id}})
        
        if(relation) {
            
            cart.total -= (relation.price * relation.amount)
            await relation.destroy()
            await cart.save()
            
            res.send('The product was removed from cart')
        }
        else res.send('Relation not found')
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.delete('/users/:email/emptycart', async (req, res) => {
    const {email} = req.params,{name,lastname}=req.query
    try {
        const cart = await Orders.findOne({where: {UserEmail: email, status: 'Cart'}})

        if(cart){

                await cart.destroy()
                await Orders.findOrCreate({where: {UserEmail: email, status: 'Cart', name,lastname}})
                res.send('The cart has been emptied')

        }
        else res.status(404).send('Cart not found')
    }
    catch(e) {
        res.status(500).send(`${e}`)
    }
})
router.put('/users/:email/changeToRejected', async (req, res) => {
    const {email} = req.params, {orderId} = req.body
        
    try {
        const cart = await Orders.findOne({
            where: {id: orderId, UserEmail: email, status: 'In progress'},
            include: {model: Products}
        })
            
    
        if(cart){
            cart.status = 'Rejected'
            cart.Products.forEach(async (product) => {
                product.stock += product.Product_Line.amount
                await product.save()
            })
            await cart.save()
            return res.send('El status ha cambiado correctamente')
        } 
        
        else res.status(404).send('Cart not found')
    }

    catch(e){
        res.status(500).send(`${e}`)
    }
        
})

module.exports = router;