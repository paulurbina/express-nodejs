const { Router } = require('express')
const router = Router()

const productMocks = require('../../utils/mocks/products')

const ProductsService = require('../../services/products')
const productsService = new ProductsService() 

router.get('/', async (req, res, next) => {
    const { tags } = req.query
    
    try {
        const products = await productsService.getProducts({ tags })
        res.render('products', { products })
    } catch (err) {
        next(err)
    }
})

module.exports = router