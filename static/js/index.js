const serverSocket = io('http://localhost:8080')

serverSocket.on('mensajito', datosAdjuntos => {
    console.log(datosAdjuntos)
})

const btn = document.getElementById('btn');
btn.addEventListener('click', ()=>{
    serverSocket.emit('msgClient',{ datos: {datos: [1,2,3]}})
})
