const { Router } = require('express');
const {Products, Categories, products_categories} = require('../db')
const {Op} = require('sequelize')
const router = Router();

/////////////////////////////////////////////////////////////////////////////////////////////

router.get('/products', async (req, res) => {
    const {name, category} = req.query
    let products = []

    if(name && category) {
        products = await Products.findAll({
            where: { name: {[Op.iLike]: `%${name}%`} },
            include: { model: Categories, where: {name: category} }
        })
    }

    else if(name) {
        products = await Products.findAll({where: 
            { name: {[Op.iLike]: `%${name}%`} }
        })
    }

    else if(category) {
        products = await Products.findAll({include: {
            model: Categories, where: {name: category}
        }})
    }

    else products = await Products.findAll()
    

    if(products.length) res.send(products)
    else res.send('Products not found')
})

/////////////////////////////////////////////////////////////////////////////////////////////

router.get('/products/:productId', async (req, res) => {
    const {productId} = req.params
    const product = await Products.findOne({where: {id: productId}, include: Categories})

    if(product) res.send(product)
    else res.send('Product not')
})

/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/createProduct', async (req, res) => {
    const {name, price, stock, image, description, categoryName} = req.body

    try {
        const product = await Products.create({name, price, stock, image, description})
        const category = await Categories.findOne({where: {name: categoryName}})
        if(category) product.addCategories(category)
        res.send('Products Create')
    } catch (e){
        res.send(`error: ${e}`)
    }
})

router.put('/updateProduct/:productId', async (req, res) => {
    const {productId} = req.params, {name, price, stock, image, description} = req.body

    const product = await Products.findOne({where: {id: productId}})

    if(name) product.name = name
    if(price) product.price = price
    if(stock) product.stock = stock
    if(image) product.image = image
    if(description) product.description = description

    await product.save()
    res.send('Product update')
})

router.delete('/deleteProduct/:productId', async (req, res) => {
    const {productId} = req.params

    const product = await Products.findOne({where: {id: productId}})

    if(product) {
        await product.destroy()
        res.send('product delete')
    }

    else res.send('product not exist')
})

/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/products/:productId/categories/:categoryId', async (req, res) => {
    const {productId, categoryId} = req.params

    const relation = await products_categories.findOne({where: productId, categoryId})

    if(!relation){
        const product = await Products.findOne({where: {id: productId}})
        const category = await Categories.findOne({where: {id: categoryId}})
    
        if(product && category) {
            await product.addCategories(category)
            res.send('categoria agregada')
        }
        else res.send('404 Not Found')
    }

    else res.send('Product ya tiene esa categoria')
})

router.delete('/products/:productId/categories/:categoryId', async (req, res) => {
    const {productId, categoryId} = req.params
    
    const relation = await products_categories.findOne({where: productId, categoryId})

    if(relation) {
        await relation.destroy()
        res.send('category eliminated')
    }
    else res.send('la categoria no pertenece al producto')
})

/////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;