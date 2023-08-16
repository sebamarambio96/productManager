import winston from "winston";
import { NODE_ENV, WINSTON_LEVEL } from "../config/env.config.js";

/* const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
}; */

const winstonLoggerDev = winston.createLogger({
    // levels,
    transports: [
        new winston.transports.Console({
            level: WINSTON_LEVEL,
        }),
    ],
});

const winstonLoggerProd = winston.createLogger({
    // levels,
    transports: [
        new winston.transports.File({
            level: "silly",
            filename: "events.log",
        }),
    ],
});

export let Logger;
if (NODE_ENV === "prod") {
    Logger = winstonLoggerProd;
} else {
    Logger = winstonLoggerDev;
}
