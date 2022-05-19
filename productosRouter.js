const express = require('express')
const { Router } = express 

const productosRouter = Router()

// const middlewareProductoValidator = (req, res, next) => {
//     const newProducto = req.body
    
//     if(!newProducto.title|| !newProducto.precio || !newProducto.thumbnail){
//          console.log('Request inválido')
//          return res.status(400).json({
//              error: 'Body incompleto'
//          })
//     }
//     //para no mandar un post incomplet.
//     //tiene que contener tosos os elementos necesarios

//     return next()
// }

let productos = []
productosRouter.get('', (req, res) => {
    return res.json(productos)
})
productosRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log({ id })
    
    const producto = productos.find(producto => producto.id === id)

    //si el mensaje no existe
    if(!producto){
        return res.status(404).json({
            error: 'Mensaje no encontrado'
        })
    }
    return res.json(producto)
})
productosRouter.post('', (req, res) => {
    const newProducto = req.body

    newProducto.id = productos.length + 1
    productos.push(newProducto)

    return res.status(201).json(newProducto)
})
productosRouter.put('/:id', (req, res) => {
    console.log('PUT Request recibido')
   
    const id = Number(req.params.id)
    const productoIndex = productos.findIndex(e => e.id === id)

    //si el mensaje no existe
    if(productoIndex === -1){
        return res.status(404).json({
            error: 'Mensaje no encontrado'
        })
    }
    productos[productoIndex].title = req.body.title
    productos[productoIndex].precio = req.body.precio
    productos[productoIndex].thumbnail = req.body.thumbnail

    return res.json(productos[productoIndex])
})
productosRouter.delete('/:id', (req, res) => {
    console.log('DELETE Request recibido')
   
    const id = Number(req.params.id)
    const productoIndex = productos.findIndex(e => e.id === id)

    //si el mensaje no existe
    if(productoIndex === -1){
        return res.status(404).json({
            error: 'Mensaje no encontrado'
        })
    }
    
    productos = productos.filter(e => e.id != id)

    return res.status(204).json({})
})

module.exports = productosRouter