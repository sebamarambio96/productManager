import express from "express"
import { apiRouter } from "./routers/apiRouter.js"

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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


