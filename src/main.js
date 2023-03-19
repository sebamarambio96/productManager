import express from "express"
import { engine } from "express-handlebars"
import { Server as SocketIOServer } from "socket.io"
import { apiRouter } from "./routers/apiRouter.js"
import { render } from "./routers/renderRouter.js"


const app = express()

//middlewares
app.use('/static', express.static('./static'))
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', render)
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

const io = new SocketIOServer(server)

io.on('connection', clientSocket => {
    console.log(`Nuevo cliente conectado! socket id# ${clientSocket.id}`)
    clientSocket.emit('mensajito', { hola: 'hola mundo' })
    clientSocket.on('msgClient', datosAdjuntos => {
        console.log(`#${clientSocket.id} dice:`)
        console.log(datosAdjuntos)
    })
})