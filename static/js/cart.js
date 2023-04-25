let cartID
const serverSocket = io('http://localhost:8080')
let cartSave = localStorage.getItem('cartID')
console.log(cartSave);
if (!cartSave) {
    fetch('http://localhost:8080/api/carts/', {
        method: 'POST'
    }
    )
        .then(res => res.json())
        .then(res => {
            console.log(res.cart._id)
            localStorage.setItem('cartID', res.cart._id)
        })
} else {
    cartID = localStorage.getItem('cartID')
    fetch(`http://localhost:8080/api/carts/${cartID}`, {
        method: 'GET',
    }
    )
        .then(res => res.json())
        .then(res => {
            const template = `
<h2 class="py-3">Listado de productos:</h2>
{{#if hayProductos}}
<div class="d-flex gap-3 flex-wrap">
    {{#each products}}
        <div class="card" style="width: 15rem;">
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">ID: {{this._id}}</h6>
                <h5 class="card-title text-success">Nombre: {{this.product.tittle}}</h5>
                <h6 class="card-title text-success">Cantidad: {{this.quantity}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Categoría: {{this.product.category}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Precio: {{this.product.price}}</h6>
                <button id="{{this.product._id}}" class="btn btn-danger">Eliminar</button>
            </div>
        </div>
    {{/each}}
</div>
{{else}}
    <p>no hay productos...</p>
{{/if}}
`
            const renderProducts = Handlebars.compile(template)
            const divProducts = document.getElementById('productsList')
            if (divProducts) {
                divProducts.innerHTML = renderProducts({ products: res.cartProducts, hayProductos: res.cartProducts.length > 0 })
                listenDeleteButtons()
            }
        })
}


//Actualizar carrito
serverSocket.on('updateCart', async cart => {
    fetch(`http://localhost:8080/api/carts/${cartID}`, {
        method: 'GET',
    }
    )
        .then(res => res.json())
        .then(res => {
            console.log(res)
            const template = `
<h2 class="py-3">Listado de productos:</h2>
{{#if hayProductos}}
<div class="d-flex gap-3 flex-wrap">
    {{#each products}}
        <div class="card" style="width: 15rem;">
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">ID: {{this._id}}</h6>
                <h5 class="card-title text-success">Nombre: {{this.product.tittle}}</h5>
                <h6 class="card-title text-success">Cantidad: {{this.quantity}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Categoría: {{this.product.category}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Precio: {{this.product.price}}</h6>
                <button id="{{this.product._id}}" class="btn btn-danger">Eliminar</button>
            </div>
        </div>
    {{/each}}
</div>
{{else}}
    <p>no hay productos...</p>
{{/if}}
`
            const renderProducts = Handlebars.compile(template)
            const divProducts = document.getElementById('productsList')
            if (divProducts) {
                divProducts.innerHTML = renderProducts({ products: res.cartProducts, hayProductos: res.cartProducts.length > 0 })
                listenDeleteButtons()
            }
        })
})


function listenDeleteButtons() {
    const buttons = document.querySelectorAll('.btn-danger')
    console.log(buttons);
    buttons.forEach(btn => {
        btn.addEventListener('click', e => {
            console.log('firts');
            fetch(`http://localhost:8080/api/carts/${cartID}/product/${btn.id}`, {
                method: 'DELETE',
            }
            )
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    cartSave = localStorage.getItem('cartID')
                    serverSocket.emit('updateCart', cartSave)
                })
        })
    })
}

listenDeleteButtons()