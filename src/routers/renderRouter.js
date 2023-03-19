import { Router } from "express"

export const render = Router()

//GET cart by id
render.get('/', async (req, res, next) => {
    res.render('index.hbs', {
        titulo: 'Inicio',
        encabezado: 'Inicio'
    })
})
render.get('/about', async (req, res, next) => {
    const listado = ['hola', 'chau']
    /* const listado = [] */
    res.render('list.hbs', {
        titulo: 'About',
        encabezado: 'Acerca de mi',
        listado,
        hayListado: listado.length > 0
    })
})
