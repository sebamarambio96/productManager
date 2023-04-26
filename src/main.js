import express from "express"
import { engine } from "express-handlebars"
import { Server as SocketIOServer } from "socket.io"
import { apiRouter } from "./routers/apiRouter.js"
import { viewsRouter } from "./routers/viewsRouter.js"
import { ioManager } from "./controllers/mongoIoController.js"
import { connectMongo } from "./data/mongoose.js"
import { loginRouter } from "./routers/loginRouter.js"
import cookieParser from 'cookie-parser'
import session from 'express-session'

//Se conecta base de datos
await connectMongo()

const app = express()

//middlewares
app.use(cookieParser('secreto'))
app.use(session())
app.use('/static', express.static('./static'))
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', viewsRouter)
app.use('/api', apiRouter)
app.use('/profile', loginRouter)

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
        case 'Login Failed':
            res.status(401)
            break
        default:
            res.status(500)
    }
    res.json({ message: error.message })
})

const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`))

export const io = new SocketIOServer(server)

//Importa la función que comunica la base de datos y el front para actualización automatica
ioManager(io)


/* FyleSystem */
// io.on('connection',async clientSocket => {
//     console.log(`Nuevo cliente conectado! socket id# ${clientSocket.id}`)
//     clientSocket.emit('updateProducts', await productManager.getProducts())
//     clientSocket.on('newProduct', async product => {
//         await productManager.addProduct(product)
//         clientSocket.emit('updateProducts', await productManager.getProducts())
//     })
//     clientSocket.on('deleteProduct', async item => {
//         await productManager.deleteProduct(item.id)
//         clientSocket.emit('updateProducts', await productManager.getProducts())
//     })
// })