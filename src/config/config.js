import dotenv from 'dotenv'

dotenv.config()

const PORT= process.env.PORT
const SECRET= process.env.SECRET
const MONGO= process.env.MONGO

export {PORT, SECRET, MONGO}
