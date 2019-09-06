const Joi = require('@hapi/joi')

const productIdSchema = Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
const productTagSchema = Joi.array().items(Joi.string().max(10))

const createProductSchema = {
    name: Joi.string().max(50).required(),
    price: Joi.number().min(1).max(99999),
    image: Joi.string().required(),
    tags: productTagSchema
}

const updateProductSchema = {
    name: Joi.string().max(50),
    price: Joi.number().min(1).max(9999999),
    image: Joi.string(),
    tags: productTagSchema
}

module.exports = {
    productIdSchema,
    productTagSchema,
    createProductSchema,
    updateProductSchema
}