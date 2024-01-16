import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import cluster from "cluster";
import { cpus } from "os";
import { engine } from "express-handlebars";
import { Server as SocketIOServer } from "socket.io";
import { apiRouter } from "./routers/apiRouter.js";
import { viewsRouter } from "./routers/viewsRouter.js";
import { ioManager } from "./controllers/mongoIoController.js";
import { connectMongo } from "./config/mongoose.config.js";
import { sessionRouter } from "./routers/sessionRouter.js";
import { messagesRouter } from "./routers/msgRouter.js";
import { passportInit, passportSession } from "./config/passport.config.js";
import { MONGO_BBDD, MONGO_PASS, MONGO_SERVER, MONGO_USER, PORT, SECRET, SERVER_MODE } from "./config/env.config.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { Logger } from "./utils/winston.js";

//Se conecta base de datos
await connectMongo();

const app = express();

//middlewares
app.use(cookieParser(SECRET));
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_SERVER}/${MONGO_BBDD}?retryWrites=true&w=majority`,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
            ttl: 15,
        }),
        secret: SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use("/static", express.static("./static"));
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.json({ limit: '100mb' }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(passportInit, passportSession);
app.use("/", viewsRouter);
app.use("/api", apiRouter);
app.use("/profile", sessionRouter);
app.use("/msg", messagesRouter);

//Error handling
app.use(errorHandler);

//Cluster
let io;
if (SERVER_MODE === "cluster" && cluster.isPrimary) {
    const numCPUs = cpus().length;

    Logger.silly(`N° of CPUs: ${numCPUs}`);
    Logger.silly(`PID PRIMARY ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    //Aquí escuchamos los eventos del cluster
    cluster.on("exit", (worker) => {
        //Si se escucha un evento exit podemos volver a
        //invocar el fork para que siempre haya la misma cantidad de procesos
        Logger.silly("Worker", worker.process.pid, "died", new Date().toLocaleString());
        cluster.fork();
    });
} else {
    const server = app.listen(PORT, () => {
        Logger.silly(`Servidor en el puerto ${PORT} - PID WORKER ${process.pid}`);
        Logger.silly(`Documentación disponible en http://localhost:${PORT}/api/docs`);
    });
    io = new SocketIOServer(server);
    //Importa la función que comunica la base de datos y el front para actualización automatica
    ioManager(io);
}