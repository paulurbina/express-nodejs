const express = require('express')
const router = express.Router()

const ProductsService = require('../../services/products')
const productServices = new ProductsService()

router.get('/', (req, res, next) => {
    try {
        const { tags } = req.query
        const products = productServices.getProducts({ tags })
        console.log(products)
        res.render('products', { products })
    } catch (error) {
        next(error)
    }
})

module.exports = router