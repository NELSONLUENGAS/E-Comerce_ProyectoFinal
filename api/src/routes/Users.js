const { Router } = require('express');
const {Users} = require('../db')
const router = Router();

router.get('/users', async (req, res) => {
    const users = await Users.findAll()
    if(users.length) res.send(users)
    else res.send('no hay usuarios')
})

router.get('/login', async (req, res) => {
    const {email, password} = req.query
    const user = await Users.findOne({where: {email, password}})
    if(user) res.send(user)
    else res.status(404).send('El usuario o contraseña son incorrectos')
})

router.post('/createUser', async (req, res) => {
    const {email, password, name, lastname, birthday, dni, nationality, province, city, postalcode, direction, phone} = req.body

    try {
        const user = {email, password, name, lastname, birthday, dni, nationality, province, city, postalcode, direction, phone}
        await Users.create(user)
        res.send('The user has been created successfully')
    } 
    catch {
        res.send('The e-mail is alreay been used')
    }
    
})

router.post('/users/:email/addlocation', async (req, res) => {
    const {newAdress} = req.body, {email} = req.params

    try{
        const user = await Users.findOne({where: {email}})
        user.direction=[...user.direction,newAdress]
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
    const {password, province, city, postalcode, direction, index, phone} = req.body, {email} = req.params

    try{
        const user = await Users.findOne({where: {email}})
        
        if(password === user.password){
            if(phone) user.phone = phone
            if(index+1 && city) user.city = updateArray(user, "city", city, index)
            if(index+1 && province) user.province = updateArray(user, "province", province, index)
            if(index+1 && direction) user.direction = updateArray(user, "direction", direction, index)
            if(index+1 && postalcode) user.postalcode = updateArray(user, "postalcode", postalcode, index)
    
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

    const user = await Users.findOne({email})

    if(password === user.password) {
        user.password = newPassword
        await user.save()
        res.send('The password has been changed')
    }

    else res.send('The password that you entered is incorrect')
})

module.exports = router;


function updateArray(user, property, newData, index) {
    return user[property].map((oldData, i) => {
        if(i === index) return newData
        else return oldData
    })
}

function filterArray(user, property, index) {
    return user[property].filter((oldData, i) => i !== index)
}