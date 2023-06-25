class Logger {
    constructor(entorno) {
        this.entorno = entorno
    }
    log(mensaje) {
        if (this.entorno === 'dev') {
            console.log(`${new Date().toLocaleString()}: ${mensaje}`)
        }
    }
}

export const logger = new Logger(process.env.NODE_ENV)