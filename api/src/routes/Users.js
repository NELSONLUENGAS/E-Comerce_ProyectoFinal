const { Router } = require('express');
const {Users, Orders} = require('../db')
const router = Router();

router.get('/users', async (req, res) => {
    const users = await Users.findAll()
    if(users.length) res.send(users)
    else res.send('no hay usuarios')
})

router.get('/login', async (req, res) => {
     const {email, password} = req.query, {guestCart} = req.body

    const user = await Users.findOne({where: {email, password}})
    
    if(user) {
    
        if(guestCart){
            
            const cart = await Orders.findOne({where: {UserEmail: email, status: 'Cart'}})

            guestCart.forEach(async (product) => {
                const relation = await Product_Line.findOne({where: {OrderId: cart.id, ProductId: product.id}})

                if(!relation){
                    const currentProduct = await Products.findOne({where: {id}})
                    await cart.addProduct(currentProduct, {through: {amount: product.amount, price: currentProduct.price}})
                }
            })
        }
    
        res.send(user)
    }

    else res.send('El usuario o contraseña son incorrectos')
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