const { Router } = require('express')
const router = Router()
const ProductsService = require('../../services/products')

const validation  = require('../../utils/middlewares/validationHandler')
const {
    createProductSchema,
    updateProductSchema,
    productIdSchema,
    productTagSchema
} = require('../../utils/schemas/products')

const productsService = new ProductsService() 

router.get('/', async (req, res, next) => {
    try {
        const { tags } = req.query

        const products = await productsService.getProducts({ tags })
    
        res.status(200).json({
            data: products,
            message: 'products listed'
        })    
    } catch (err) {
        next(err)
    }
    
})

router.get('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params
    
        const products = await productsService.getProduct({ productId })
        
        res.status(200).json({
            data: products,
            message: 'products unique show'
        })
    } catch (err) {
        next(err)
    }
    
})

router.post('/', validation(createProductSchema), async (req, res, next) => {
    try {
        const { body: product } = req
        const createProduct = await productsService.createProduct({ product })
        
        res.status(201).json({
            data: createProduct,
            message: 'products created'
        })
    } catch (err) {
        next(err)
    }
   
})

router.put('/:productId', 
        validation({ productId: productIdSchema }, "params"),
        validation(updateProductSchema), async (req, res, next) => {
    
        try {
        const { productId } = req.params
        const { body: product } = req
        const updateProduct = await productsService.updateProduct({ productId, product })

        res.status(200).json({
            data: updateProduct,
            message: 'products updated'
        })
    } catch (err) {
        next(err)
    }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params
    const product = await productsService.deleteProduct({ productId })
    
    res.status(200).json({
        data: product,
        message: 'products deleted'
    })
  } catch (err) {
      next(err)
  }
})

module.exports = router