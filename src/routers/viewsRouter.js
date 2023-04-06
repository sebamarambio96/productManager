import { Router } from "express"
import { productsManager } from "../dao/models/productsShema.js"
/* import { productManager } from "../controllers/productsController.js" */

export const viewsRouter = Router()

//GET cart by id
viewsRouter.get('/', async (req, res, next) => {
    let products = await productsManager.getAll()
    res.render('home.hbs', {
        titulo: 'Inicio',
        encabezado: 'Inicio',
        products,
        hayProductos: products.length > 0
    })
})

viewsRouter.get('/realtimesproduct', async (req, res, next) => {
    let products = await productsManager.getAll()
    res.render('realTimesProduct.hbs', {
        titulo: 'Productos tiempo real',
        encabezado: 'Productos tiempo real',
        products,
        hayProductos: products.length > 0
    })
})

viewsRouter.get('/Chat', async (req, res, next) => {
    res.render('chat.hbs', {
        titulo: 'Productos tiempo real',
        encabezado: 'Productos tiempo real',
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
