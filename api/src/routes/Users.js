const { Router } = require('express');
const {Users, Product_Line,Products,Orders} = require('../db')
const router = Router();

router.get('/users', async (req, res) => {
    const users = await Users.findAll()
    if(users.length) res.send(users)
    else res.send('no hay usuarios')
})

router.get('/login', async (req, res) => {
     const {email, password} = req.query

    const user = await Users.findOne({where: {email, password}})   
    
    if(user) {
        res.send(user)
    }

    else res.send('El usuario o contraseña son incorrectos')
})
router.post('/guestCart/:email',async(req,res) =>{
    const {guestCart} = req.body
    const {email} = req.params
    console.log(guestCart)
    if(guestCart){
            
        const cart = await Orders.findOne({where: {UserEmail: email, status: 'Cart'}})

        guestCart.forEach(async (product) => {
            const relation = await Product_Line.findOne({where: {OrderId: cart.id, ProductId: product.id}})

            if(!relation){
                const currentProduct = await Products.findOne({where: {id:product.id}})
                await cart.addProduct(currentProduct, {through: {amount: product.quantity, price: currentProduct.price}})
            }else{
                let currentQuantity=relation.amount+product.quantity
                if(product.stock>=currentQuantity) relation.amount = currentQuantity
                else relation.amount=product.stock
                await relation.save()
            }
        })
        return res.send('Se añadieron los productos al carrito')
    }
    res.send('No se ha pasado un carrito')

})

router.post('/createUser', async (req, res) => {
    const {email, password, name, lastname, birthday, dni, nationality,direction, phone,direccion} = req.body

    try {
        const user = {email, password, name, lastname, birthday, dni, nationality,principalDirection:direction, directions:direction, phone}
        await Users.create(user)
        await Orders.findOrCreate({where: {UserEmail: email, status: 'Cart',name:name,lastname:lastname}})
        res.send('The user has been created successfully')
    } 
    catch(e) {
        res.status(500).send(`${e}`)
    }
    
})

router.post('/users/:email/addlocation', async (req, res) => {
    const {direction,postalcode,city,province} = req.body, {email} = req.params
    const newAdress={direction,postalcode,city,province}

    try{
        const user = await Users.findOne({where: {email}})
        user.directions=[...user.directions,newAdress]
        await user.save()
        res.send('Add new location')
    }
    catch {
        res.status(500).send('INVALID EMAIL')
    }
})

router.delete('/users/:email/removelocation', async (req, res) => {
    const {index} = req.body, {email} = req.params

    try{
        const user = await Users.findOne({where: {email}})
        
        if(user.direction.length > 1){
            user.direction = user.direction.filter((d, i) => i !== index)
            await user.save()
            res.send('remove location')
        }
        else res.send('no se ha encontrado el usuario')
    }
    catch {
        res.status(500).send('INVALID EMAIL')
    }
})

router.put('/users/:email/update', async (req, res) => {
    const {password, newAddress, index, phone} = req.body, {email} = req.params

    try{
        const user = await Users.findOne({where: {email}})
        
        if(password === user.password){
            if(phone) user.phone = phone
            if(index+1 && newAddress) user.city = user.direction.map((oldData, i) => {
                if(i === index) return newAddress
                else return oldData
            })
    
            await user.save()
            res.send('Update user')
        }
        else res.send('The password that you entered is incorrect ')
    }
    catch {
        res.status(500).send('INVALID EMAIL')
    }
})


router.put('/changePassword/:email', async (req, res) => {
    const {email} = req.params, {password, newPassword} = req.body

    const user = await Users.findByPk(email)

    if(password === user.password) {
        user.password = newPassword
        await user.save()
        res.send('The password has been changed')
    }

    else res.send('The password that you entered is incorrect')
})

module.exports = router;