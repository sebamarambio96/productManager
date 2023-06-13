const serverSocket = io('http://localhost:8080')
let cartSave = localStorage.getItem('cartID')
const allCookies = document.cookie
console.log(allCookies)


/* console.log(cartSave); */
if (!cartSave) {
    fetch('http://localhost:8080/api/carts/', {
        method: 'POST'}
    )
        .then(res => res.json())
        .then(res => {
            console.log(res.cart._id)
            localStorage.setItem('cartID', res.cart._id)
        })
} else {
    cartSave = localStorage.getItem('cartID')
}


/* //Nuevo carrito
serverSocket.on('newCart', async cart => {
    cartID = localStorage.setItem('cartID', cart._id)
}) */

function listenAddButtons() {
    const buttons = document.querySelectorAll('.btn-info')
    /* console.log(buttons); */
    buttons.forEach(btn => {
        btn.addEventListener('click', e => {
            fetch(`http://localhost:8080/api/carts/${cartSave}/product/${btn.id}`, {
                method: 'POST',
            }
            )
                .then(res => res.json())
                .then(res => console.log(res))
        })
    })
}

listenAddButtons()