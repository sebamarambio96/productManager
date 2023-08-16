const serverSocket = io("http://localhost:8080");

const btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const thumbnail = document.getElementById("imagen").value;
    const description = document.getElementById("description").value;
    const code = document.getElementById("code").value;
    const category = document.getElementById("category").value;
    if ((title != "") & (price != "") & (stock != "") & (description != "") & (code != "") & (category != "")) {
        fetch(`https://productmanager.up.railway.app/profile/current`)
            .then((res) => res.json())
            .then((res) => {
                if (res.role === "admin" || res.role === "premium") {
                    serverSocket.emit("newProduct", {
                        title,
                        price,
                        stock,
                        thumbnail,
                        description,
                        code,
                        category,
                        owner: res.user,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `Solo un administrador o premium puede crear un producto`,
                    });
                }
            });
    }
});

const btnDelete = document.getElementById("btnDelete");
btnDelete.addEventListener("click", () => {
    const id = document.getElementById("id").value;
    if (id != "") {
        fetch(`https://productmanager.up.railway.app/api/products/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((res) => {
                let message = res.message;
                if (res.description) {
                    message = res.description;
                }
                Swal.fire({
                    title: "Resultado:",
                    text: `${message}`,
                });
                if (res.message == "Producto eliminado") {
                    window.location.href = "/realtimesproduct";
                }
            });
    }
});

//Renderizar

const template = `
<h2 class="py-3">Listado de productos:</h2>
{{#if hayProductos}}
<div class="d-flex gap-3 flex-wrap">
    {{#each products}}
        <div class="card" style="width: 15rem;">
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">ID: {{this._id}}</h6>
                <h5 class="card-title text-success">Nombre: {{this.title}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Categoría: {{this.category}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Stock: {{this.stock}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Precio: {{this.price}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Imagen: {{this.thumbnail}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Codigo: {{this.code}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Descripción: {{this.description}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Vendedor: {{this.owner}}</h6>
            </div>
        </div>
    {{/each}}
</div>
{{else}}
    <p>no hay productos...</p>
{{/if}}
`;
const renderProducts = Handlebars.compile(template);

serverSocket.on("updateProducts", (products) => {
    const divProducts = document.getElementById("productsList");
    if (divProducts) {
        divProducts.innerHTML = renderProducts({ products, hayProductos: products.length > 0 });
    }
});
