import express from "express"
import { engine } from "express-handlebars"
import { Server as SocketIOServer } from "socket.io"
import { apiRouter } from "./routers/apiRouter.js"
import { viewsRouter } from "./routers/viewsRouter.js"
import { ioManager } from "./controllers/mongoIoController.js"
import { connectMongo } from "./data/mongoose.js"
import { profileRouter } from "./routers/profileRouter.js"
import { messagesRouter } from "./routers/msgRouter.js"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from "connect-mongo"
import { passportInit, passportSession } from "./config/passport.config.js"
import cors from "cors"
import { MONGO, PORT, SECRET } from "./config/config.js"
import { errorHandler } from "./middlewares/errorHandler.js"

//Se conecta base de datos
await connectMongo()

const app = express()

//middlewares
app.use(cookieParser(SECRET))
app.use(session({
    store: MongoStore.create({
        mongoUrl:`mongodb+srv://sebamarambio:${MONGO}@estudio.1agovhf.mongodb.net/Practica?retryWrites=true&w=majority`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 15,
    }),
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use('/static', express.static('./static'))
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views')
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(passportInit, passportSession)
app.use('/', viewsRouter)
app.use('/api', apiRouter)
app.use('/profile', profileRouter)
app.use('/msg', messagesRouter)

//Error handling
app.use(errorHandler)

const server = app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`))

export const io = new SocketIOServer(server)

//Importa la función que comunica la base de datos y el front para actualización automatica
ioManager(io)