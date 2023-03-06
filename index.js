import app from "./src/app.js";


async function main() {
    try {
        const port = 8080
        app.listen(port)
        console.log(`Servidor en el puerto ${port}`)
    } catch (error) {
        console.error('Hubo un error en el servidor');
    }
}

main()
