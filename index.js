const express = require('express')
const path = require('path')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const boom = require('@hapi/boom')
const productsRouter = require('./routes/views/products')
const apiProductsRouter = require('./routes/api/products')
const authApiRouter = require('./routes/api/auth')

const {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
} = require('./utils/middlewares/errorsHanlers')

const isRequestAjaxApi = require('./utils/isRequestAjaxApi')

//app
const app = express()
const port = process.env.PORT || 8080

// middllewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// static files
app.use(express.static(path.join(__dirname, 'public')))

// view engine 
app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', exhbs({
    defaultLayout:  'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}))
app.set('view engine', 'hbs')

//routes
app.use('/products', productsRouter)
app.use('/api/products', apiProductsRouter) 
app.use('/api/auth/token', authApiRouter) 

app.get('/', (req, res) => {
    res.redirect('/products')
})

app.use(function (req, res, next) {
    if(isRequestAjaxApi(req)) {
        const {
            output: { statusCode, payload }
        } = boom.notFound()
        const { output } = boom.notFound()
        //console.log(output)
        res.status(statusCode).json(payload)
    }

    res.status(404).render("404")
})

// error haandlers
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)


// server
const server = app.listen(port, () => {
    console.log(`server listenin ${server.address().port}`);
})