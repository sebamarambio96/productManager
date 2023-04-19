import { Router } from "express"
import { productsManager } from "../dao/models/productsShema.js"
import { cartsManager } from "../dao/models/cartsShema.js"
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

viewsRouter.get('/cart', async (req, res, next) => {
    res.render('cart.hbs', {
        titulo: 'Carrito',
        encabezado: 'Carrito',
        /* cart,
        hayCarrito: cart.length > 0 */
    })
})

viewsRouter.get('/products', async (req, res, next) => {
    let sort
    if (req.query.stock) {
        sort = req.query.stock === 'asc' ? { stock: 1 } : { stock: -1 }
    } else {
        sort = req.query.price === 'asc' ? { price: 1 } : { price: -1 }
    }
    const options = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        lean: true,
        sort
    }
    const category = req.query.category ? { category: req.query.category } : {}
    let products = await productsManager.getPaginate(category, options)
    console.log(products)
    const info = {
        status: products ? 'Success' : 'Error',
        payload: products.docs,
        totalPages: products.totalPages, 
        prevLink: products.prevPage,
        nextLink: products.nextPage,
        page: products.page,
        limit: products.limit,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage,
    }
    res.render('products.hbs', {
        titulo: 'Products Pagination',
        encabezado: 'Products Pagination',
        products: info.payload,
        info,
        hayProductos: info.payload.length > 0
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
