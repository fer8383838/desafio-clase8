const express = require('express')
const { Router } = express 

const productosRouter = require('./productosRouter')

const app = express()

//app.use son middleware antes de las rutas
//se ejecuta en cada request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/static',express.static(__dirname + '/public'))
//localhost:8080/static/banner.jpg

const middlewareGlobal = (req, res, next) => {
    console.log('Paso por el middleware Global')
    return next()
}
app.use(middlewareGlobal)
const middlewareFn = (req, res, next) => {
    console.log('Paso por el middlewareFn')
    return next()
}
const middlewareFn2 = (req, res, next) => {
    console.log('Paso por el middlewareFn2')
    return next()
}
const middlewareFn3 = (req, res, next) => {
    console.log('Paso por el middlewareFn3')
    return next()
}

app.get('/', middlewareFn, middlewareFn2, middlewareFn3, (req, res) => {
    return res.json({
        status: 'ok'
    })
})

//con esto se usan los routers
app.use('/api/productos', productosRouter)
//localhost:8080/api/personas

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${PORT}`)
})

server.on('error', error => console.log(`Error de servidor: ${ error }`))