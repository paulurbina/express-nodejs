const express = require('express')
const path = require('path')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const {
    logErrors,
    withErrorStack,
    clientErrorHandler,
    errorHandler
} = require('./utils/middlewares/errorsHandlers')
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')
const boom = require('@hapi/boom')

//app
const app = express()

// middllewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//routes
const productRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')


// static files
app.use('./static', express.static(path.join(__dirname, 'public')))

//testing
// const expressJsx = require('./express-jsx')
// app.engine('jsx', expressJsx)

// view engine 
app.engine('hbs', exhbs({ extname: '.hbs' }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

//routes
app.use('/products', productRouter)
app.use('/api/products', productsApiRouter)

//redirect
app.get('/', (req, res) => {
    res.redirect('/products')
})

app.use(function(req, res, next) {
    if(isRequestAjaxOrApi(req)) {
        const {
            output: { statusCode, payload }
        } = boom.notFound()

        res.status(statusCode).json(payload)
    }

    res.status(404).render("404")
})

//error handlers
app.use(logErrors)
app.use(clientErrorHandler)
app.use(withErrorStack)
app.use(errorHandler)
 
const server = app.listen(3000, () => {
    console.log(`server listenin ${server.address().port}`);
})