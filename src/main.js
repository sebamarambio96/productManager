import express from "express"
import { engine } from "express-handlebars"
import { Server as SocketIOServer } from "socket.io"
import { productManager } from "./controllers/productsController.js"
import { apiRouter } from "./routers/apiRouter.js"
import { viewsRouter } from "./routers/viewsRouter.js"


const app = express()

//middlewares
app.use('/static', express.static('./static'))
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', viewsRouter)
app.use('/api', apiRouter)

//Error handling
app.use((error, req, res, next) => {
    switch (error.message) {
        case 'ID no existe':
            res.status(404)
            break
        case 'Falta un argumento':
            res.status(400)
            break
        case 'El codigo ingresado ya existe':
            res.status(400)
            break
        default:
            res.status(500)
    }
    res.json({ message: error.message })
})

const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`))

export const io = new SocketIOServer(server)

io.on('connection',async clientSocket => {
    console.log(`Nuevo cliente conectado! socket id# ${clientSocket.id}`)
    clientSocket.emit('updateProducts', await productManager.getProducts())
    clientSocket.on('newProduct', async product => {
        await productManager.addProduct(product)
        clientSocket.emit('updateProducts', await productManager.getProducts())
    })
    clientSocket.on('deleteProduct', async item => {
        await productManager.deleteProduct(item.id)
        clientSocket.emit('updateProducts', await productManager.getProducts())
    })

})