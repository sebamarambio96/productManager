import { LOG_LEVEL, NODE_ENV } from "../config/env.config.js"

class LoggerHandMade {
    constructor(env, level) {
        this.env = env
        this.level = level
    }
    log(mensaje, level = 0) {
        if (this.env === 'dev' && level <= this.level) {
            console.log(`${new Date().toLocaleString()}: ${mensaje}`)
        }
    }
}

export const logger = new LoggerHandMade(NODE_ENV, LOG_LEVEL)