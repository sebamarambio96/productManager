import winston from 'winston'
import { NODE_ENV, WINSTON_LEVEL } from '../config/env.config.js'

const levels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4
}

const winstonLoggerDev = winston.createLogger({
    // levels,
    transports: [
        new winston.transports.Console({
            level: WINSTON_LEVEL,
        })
    ]
})

const winstonLoggerProd = winston.createLogger({
    // levels,
    transports: [
        new winston.transports.File({
            level: "http",
            filename: 'events.log'
        })
    ]
})

export let winstonLogger
if (NODE_ENV === 'production') {
    winstonLogger = winstonLoggerProd
} else {
    winstonLogger = winstonLoggerDev
}