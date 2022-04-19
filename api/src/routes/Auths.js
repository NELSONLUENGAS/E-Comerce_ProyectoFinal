const { Router } = require('express');
const { Users } = require('../db')
const router = Router();

// const { isAdmin, isClient } = require('../middlewares/roles');


router.put('/promote/:email', async (req, res) => {
    const { email } = req.params;
    const user = await Users.findOne({ where: { email } });
    if (user) {
        user.isAdmin = true;
        await user.save();
        res.send('The user has been promoted successfully');
    } else {
        res.send('The user does not exist');
    }
});


router.put('/demote/:email', async (req, res) => {	
    const { email } = req.params;
    const user = await Users.findOne({ where: { email } });
    user.isAdmin = false;
    await user.save();
    res.send('The user has been demoted');
});

module.exports = router;