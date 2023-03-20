import { Router } from "express"
import { productManager } from "../controllers/productsController.js"

export const viewsRouter = Router()

//GET cart by id
viewsRouter.get('/', async (req, res, next) => {
    let products = await productManager.getProducts()
    res.render('home.hbs', {
        titulo: 'Inicio',
        encabezado: 'Inicio',
        products,
        hayProductos: products.length > 0
    })
})

viewsRouter.get('/realtimesproduct', async (req, res, next) => {
    let products = await productManager.getProducts()
    res.render('realTimesProduct.hbs', {
        titulo: 'Productos tiempo real',
        encabezado: 'Productos tiempo real',
        products,
        hayProductos: products.length > 0
    })
})

viewsRouter.get('/about', async (req, res, next) => {
    const listado = ['hola', 'chau']
    /* const listado = [] */
    res.render('list.hbs', {
        titulo: 'About',
        encabezado: 'Acerca de mi',
        listado,
        hayListado: listado.length > 0
    })
})
