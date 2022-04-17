const { Router } = require('express');
const {Products, Users, wishlist} = require('../db')
const router = Router();


router.get('/users/:email/wishlist', async (req, res) => {
    const {email} = req.params
try{
    const userWishlist = await Users.findOne({where: {email} ,include: {model: Products, attributes: {exclude: ["id"]}}})
    if(userWishlist.Products.length > 0){
    res.send(userWishlist.Products)
    }else{
        res.send(`No hay productos en la wishlist`)
    }
} 
catch(e){
    res.status(500).send(`${e}`)
}
})



router.post('/users/:email/wishlist', async (req, res) => {
    const {productId} = req.body, {email} = req.params
    
    try {
        const [userWishlist, created] = await wishlist.findOrCreate({where: {UserEmail: email, 
            ProductId: productId},
          })
          if(!created)
          {
            res.send('Product already in wishlist')
          }
          else{
            res.send('Product added to wishlist')
          }
    } catch (err) {
        console.log(err)

    }
})

router.delete('/users/:email/wishlist/:productId', async (req, res) => {
    const {productId, email} = req.params
    try {
    const userWishlist = await wishlist.findOne({where: {UserEmail: email, ProductId: productId}})
    if(userWishlist){
        await userWishlist.destroy()
        res.send('Product deleted from wishlist')
    }
    else{
        res.send('Product not in wishlist')
    }}
    catch(e){
        res.status(500).send(`${e}`)
    }
})





module.exports = router;