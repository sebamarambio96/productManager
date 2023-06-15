import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const SECRET = process.env.SECRET

//MONGO

const MONGO_USER = process.env.MONGO_USER
const MONGO_PASS = process.env.MONGO_PASS
const MONGO_BBDD = process.env.MONGO_BBDD
const MONGO_SERVER = process.env.MONGO_SERVER

//MSG

const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS

export {
    PORT,
    SECRET,

    MONGO_PASS,
    MONGO_USER,
    MONGO_BBDD,
    MONGO_SERVER,

    EMAIL_PASS,
    EMAIL_USER
}
