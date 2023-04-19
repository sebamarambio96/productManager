let cartID
if (!localStorage.getItem('cartID')) {
    fetch('http://localhost:8080/api/carts/', {
        method: 'POST',
    }
    )
    .then(res=> res.json())
    .then(res=> console.log(res))
} else {
    cartID = localStorage.getItem('cartID')
}
const serverSocket = io('http://localhost:8080')
//Nuevo carrito
serverSocket.on('newCart', async cart => {
    cartID = localStorage.setItem('cartID', cart._id)
})