const { Router } = require('express');
const {Categories} = require('../db')
const router = Router();

router.get('/categories', async (req, res) => {
    const categories = await Categories.findAll()

    res.send(categories)
})

router.post('/createCategory', async (req, res) => {
    const {name, description} = req.body

    await Categories.create({name, description})

    res.send('Product create')
})

router.put('/categories/:categoryId', async (req, res) => {
    const {name, description} = req.body, {categoryId} = req.params

    const category = await Categories.findByPk(categoryId)

    if(category){   
        if(name) category.name = name
        if(description) category.description = description
        
        await category.save()
        res.send('Update category')
    }

    else res.send('Category not found')
})

router.delete('/categories/:categoryId', async (req, res) => {
    const {categoryId} = req.params

    const category = await Categories.findByPk(categoryId)

    if(category){
        await category.destroy()
        res.send('Category deleted')
    }
    else res.send('Category not found')
})

module.exports = router;