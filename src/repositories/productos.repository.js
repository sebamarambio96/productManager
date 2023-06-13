import { productosDaoMongoose } from '../daos/productos.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

export const productosRepository = new GenericRepository(productosDaoMongoose)