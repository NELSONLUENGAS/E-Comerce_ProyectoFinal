const { Router } = require('express');
const {Users} = require('../db')
const router = Router();

router.get('/users', async (req, res) => {
    const users = await Users.findAll()

    if(users.length) res.send(users)
    else res.send('no hay usuarios')
})

router.get('/users/:email', async (req, res) => {
    const {email} = req.params
    const user = await Users.findOne({where: {email}})
    if(user) res.send(true)
    else res.send(false)
})

router.post('/createUser', async (req, res) => {
    const {email, password, name, lastname, birthday, dni, nationality, province, city, postalcode, direction, phone} = req.body

    try {
        const user = {email, password, name, lastname, birthday, dni, nationality, province, city, postalcode, direction, phone}
        await Users.create(user)
        res.send('The user has been created successfully')
    } catch {
        res.send('User already create')
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