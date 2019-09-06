const express = require('express')
const router = express.Router()

const ProductsService = require('../../services/products')
const { createProductSchema, productTagSchema, updateProductSchema, productIdSchema } = require('../../utils/schemas/products')
const validation = require('../../utils/middlewares/validationHandler')
const productServices = new ProductsService()

router.get('/', async (req, res, next) => {
    try {
        const { tags } = req.query
        const getProducts = await productServices.getProducts({ tags })

        res.status(200).json({
            data: getProducts,
            message: 'Product list'
        })
    } catch (error) {
        next(error)
    }
})


router.get('/:productId', async (req, res) => {
    try {
        const { productId } = req.params

        const getProductId =  await productServices.getProductsId({ productId })

        res.status(200).json({
            data: getProductId,
            message: 'Product with id'
        })
    } catch (error) {
        next(error)
    }
})

router.post('/', validation(createProductSchema) ,async (req, res) => {

    try {
        const { body: product } = req

        const createProduct = await productServices.createProducts({ product })

        res.status(201).json({
            data: createProduct,
            message: 'Product created!'
        })
    } catch (error) {
        next(error)
    }
})


router.put('/:productId', 
    validation({ productId: productIdSchema }, "params") ,
    validation(updateProductSchema),
    
    async (req, res) => {

    try {
        const { productId } = req.params
        const { body: product } = req

        const updateProduct = await productServices.updateProducts({ productId, product })

        res.status(201).json({
            data: updateProduct,
            message: 'Product updated!'
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/:productId', async (req, res) => {

    try {
        const { productId } = req.params

        const deleteProduct = await productServices.deleteProducts({ productId })
        res.status(200).json({
            data: deleteProduct,
            message: 'Product delete'
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router