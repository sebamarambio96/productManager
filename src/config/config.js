import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const SECRET = process.env.SECRET
const MONGO = process.env.MONGO
//MSG
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS

export { PORT, SECRET, MONGO, EMAIL_PASS, EMAIL_USER }
