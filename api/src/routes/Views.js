const router = require('express').Router();
const {Views, Products} = require('../db')

router.post('/views', async (req, res, next) =>{
    const {reference, UserEmail} = req.body;
    try{
        if(reference && UserEmail){
        const product = await Products.findOne({where:{id: reference }})
        const { id, name, price, stock, image, description} = await product.dataValues
        const [New, created] = await Views.findOrCreate({where:{ref: id, name, price, stock, image, description, UserEmail }}) 
        if(created) return res.send('success')
        return res.send('alredy exist')
        }
    }catch(error){
        next(error);
    }
})

router.post('/views/user', async(req,res,next)=>{
    const {UserEmail} = req.body;
    console.log(UserEmail, 'soy user')
    try{
        if(UserEmail){
            const views = await Views.findAll({where: {UserEmail}})
            res.send(views)
        }
    }catch(error){
        next(error)
    }
})

module.exports = router; 