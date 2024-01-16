import fs from "fs/promises";
import { Logger } from "../utils/winston.js";

export async function postDebug(req, res, next) {
    try {
        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
        const dia = String(fechaActual.getDate()).padStart(2, "0");
        const hora = String(fechaActual.getHours()).padStart(2, "0");
        const minutos = String(fechaActual.getMinutes()).padStart(2, "0");
        const segundos = String(fechaActual.getSeconds()).padStart(2, "0");

        const fechaHoraFormateada = `${año}-${mes}-${dia}_${hora}-${minutos}-${segundos}`;
        const nombreArchivo = `./static/dataReceive/datos_${fechaHoraFormateada}.json`;
        Logger.silly(nombreArchivo);
        await fs.writeFile(nombreArchivo, JSON.stringify(req.body, null, 2), "utf-8");
        res.status(200).json({ mensaje: "JSON guardado exitosamente", archivo: nombreArchivo });
    } catch (error) {
        Logger.silly(error);
        next(error);
    }
}
