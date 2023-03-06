import app from "./src/app.js";


async function main() {
    try {

        app.listen(3000)
        console.log('Servidor en el puerto 3000')
    } catch (error) {
        console.error('Hubo un error en el servidor');
    }
}

main()
