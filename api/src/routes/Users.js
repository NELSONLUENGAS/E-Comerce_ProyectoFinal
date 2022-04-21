const { Router } = require('express');
const {Users, Product_Line,Products,Orders,Review} = require('../db')
const router = Router();
const nodemailer = require('nodemailer');
const {welcome} = require('../emailMessages/usersMails')


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
        await transporter.sendMail(welcome(email,name));
    } 
    catch(e) {
        res.status(500).send(`${e}`)
    }
    
})

router.post('/users/:email/addlocation', async (req, res) => {
    const {direction, postalcode, city, province} = req.body, {email} = req.params
    const newAdress = {direction, postalcode, city, province} 

    try{
        const user = await Users.findOne({where: {email}})
        user.directions = [...user.directions,newAdress]

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
    const {password, newAddress, newPrincipal, index, phone} = req.body, {email} = req.params

    try{
        const user = await Users.findOne({where: {email}})
        
        if(password === user.password){
            if(phone) user.phone = phone
            if(index+1 && newAddress) user.city = user.direction.map((oldData, i) => {
                if(i === index) return newAddress
                else return oldData
            })
            if(newPrincipal) user.principalDirection = newPrincipal
    
            await user.save()
            res.send('Update user')
        }
        else res.send('The password that you entered is incorrect ')
    }
    catch {
        res.status(500).send('INVALID EMAIL')
    }
})
router.put('/users/:email/editPrincipalDirection', async (req, res) => {
    const {index} = req.body, {email} = req.params
    console.log(index);

    try{
        const user = await Users.findOne({where: {email}})
        
        if(user.directions.length > 1){
            user.principalDirection = user.directions.filter((d, i) => i == index)
            await user.save()
            res.send('edit location')
        }
        else res.send('no tienes mas direcciones')
    }
    catch {
        res.status(500).send('INVALID EMAIL')
    }
})

router.get('/admins', async (req, res) => {
    const user = await Users.findAll({where: {isAdmin: true}})
    if(user.length) res.send(user)
    else res.send('no hay usuarios admins')
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
router.get('/user/:email', async (req, res) => {
    const { email } = req.params;
   try{
    const user = await Users.findOne({ where: { email } });
    if(user) res.send(user)
    else res.send('no hay usuario con ese email')
    }catch(e){
        res.send(e)
    }
})
router.delete('/users/:email', async (req, res) => {
    const { email } = req.params;
    const user = await Users.findOne({ where: { email } });
    if (user) {
        const orders = await Orders.findAll({where:{UserEmail: email}})
        const reviews = await Review.findAll({where:{UserEmail: email}})
        await orders.forEach(async cart=>{await cart.destroy()})
        await reviews.forEach(async review=>{await review.destroy()})
        await user.destroy();

        res.send('The user has been deleted successfully');
    } else {
        res.send('The user does not exist');
    }
});
router.post('/users/:email/forgotPassword/:token', async (req, res) => {
    const {email, token} = req.params

    const user = await Users.findOne({where: {email}})
    if(user){
        const mailOptions = {
            from: 'latcom@gmail.com',
            to: email,
            subject: 'Recuperar contraseña',
            html: `<h1>Recuperar contraseña</h1>
            <p>Hola ${user.name} ${user.lastname}</p>
            <p>Para recuperar tu contraseña ingresa al siguiente link:</p>
            <a href="http://localhost:3000/change/${token}">Reset your Password</a>
            `
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.send('El mail ha sido enviado')
    } else{
        res.status(404).send('El usuario no ha sido encontrado')
    }
})

module.exports = router;