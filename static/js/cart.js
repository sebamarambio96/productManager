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

//Renderizar    

const template = `
<h2 class="py-3">Listado de productos:</h2>
{{#if hayProductos}}
<div class="d-flex gap-3 flex-wrap">
    {{#each products}}
        <div class="card" style="width: 15rem;">
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">ID: {{this._id}}</h6>
                <h5 class="card-title text-success">Nombre: {{this.tittle}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Categoría: {{this.category}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Precio: {{this.price}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Imagen: {{this.thumbnail}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Codigo: {{this.code}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Descripción: {{this.description}}</h6>
                <button id="btnDelete" class="btn btn-danger">Eliminar</button>
            </div>
        </div>
    {{/each}}
</div>
{{else}}
    <p>no hay productos...</p>
{{/if}}
`
const renderProducts = Handlebars.compile(template)

serverSocket.on('updateCart', products => {
    const divProducts = document.getElementById('productsList')
    console.log(products)
    if (divProducts) {
        divProducts.innerHTML = renderProducts({ products, hayProductos: products.length > 0 })
    }
})