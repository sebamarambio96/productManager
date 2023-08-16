let cartID;
const serverSocket = io("https://productmanager.up.railway.app");
let cartSave = localStorage.getItem("cartID");

if (cartSave) {
    cartID = localStorage.getItem("cartID");
    fetch(`https://productmanager.up.railway.app/api/carts/${cartID}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((res) => {
            const template = `
<h2 class="py-3">Listado de productos:</h2>
{{#if hayProductos}}
<div class="d-flex gap-3 flex-wrap">
    {{#each products}}
        <div class="card" style="width: 15rem;">
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">ID: {{this._id}}</h6>
                <h5 class="card-title text-success">Nombre: {{this.title}}</h5>
                <h6 class="card-title text-success">Cantidad: {{this.quantity}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Categoría: {{this.category}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Precio: {{this.price}}</h6>
                <button id="{{this._id}}" class="btn btn-danger">Eliminar</button>
            </div>
        </div>
    {{/each}}
</div>
{{else}}
    <p>no hay productos...</p>
{{/if}}
`;
            const renderProducts = Handlebars.compile(template);
            const divProducts = document.getElementById("productsList");
            if (divProducts) {
                divProducts.innerHTML = renderProducts({ products: res.cartProducts, hayProductos: res.cartProducts.length > 0 });
                listenDeleteButtons();
            }
        });
}

//Actualizar carrito
serverSocket.on("updateCart", async (cart) => {
    fetch(`https://productmanager.up.railway.app/api/carts/${cartID}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((res) => {
            const template = `
<h2 class="py-3">Listado de productos:</h2>
{{#if hayProductos}}
<div class="d-flex gap-3 flex-wrap">
    {{#each products}}
        <div class="card" style="width: 15rem;">
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">ID: {{this._id}}</h6>
                <h5 class="card-title text-success">Nombre: {{this.title}}</h5>
                <h6 class="card-title text-success">Cantidad: {{this.quantity}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Categoría: {{this.category}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Precio: {{this.price}}</h6>
                <button id="{{this._id}}" class="btn btn-danger">Eliminar</button>
            </div>
        </div>
    {{/each}}
</div>
{{else}}
    <p>no hay productos...</p>
{{/if}}
`;
            const renderProducts = Handlebars.compile(template);
            const divProducts = document.getElementById("productsList");
            if (divProducts) {
                divProducts.innerHTML = renderProducts({ products: res.cartProducts, hayProductos: res.cartProducts.length > 0 });
                listenDeleteButtons();
            }
        });
});

function listenDeleteButtons() {
    const buttons = document.querySelectorAll(".btn-danger");
    buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            console.log(btn.id);
            fetch(`https://productmanager.up.railway.app/api/carts/${cartID}/product/${btn.id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((res) => {
                    cartSave = localStorage.getItem("cartID");
                    serverSocket.emit("updateCart", cartSave);
                });
        });
    });
}

function listenPurchase() {
    const purcharBtn = document.getElementById("purchaseBtn");
    purcharBtn.addEventListener("click", (e) => {
        fetch(`https://productmanager.up.railway.app/profile/current`)
            .then((res) => res.json())
            .then((res) => {
                if (res.role) {
                    const data = {
                        cid: res.cart,
                        purchaser: res.user,
                        role: res.role,
                    };
                    fetch("https://productmanager.up.railway.app/api/carts/purchase", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            let message = res.message;
                            if (res.description) {
                                message = res.description;
                            }
                            if (message) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: `${message}`,
                                });
                            }
                            renderTicket(res);
                            serverSocket.emit("updateCart", cartSave);
                        })
                        .catch((err) => console.log(err));
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `¡Necesitas iniciar sesión para realizar un compra!`,
                    });
                    window.location.href = "/login";
                }
            });
    });
}

listenPurchase();
listenDeleteButtons();

function renderTicket(ticketData) {
    const formattedDate = new Date(ticketData.newTicket.purchase_datetime).toLocaleString();

    const ticketTemplate = `
    <div>
        <h2>Ticket de Compra</h2>
        <p><strong>Precio:</strong> $${ticketData.newTicket.amount}</p>
        <p><strong>Código:</strong> ${ticketData.newTicket.code}</p>
        <p><strong>Fecha de Compra:</strong> ${formattedDate}</p>
        <p><strong>Comprador:</strong> ${ticketData.newTicket.purchaser}</p>
        <h3>Productos Sin Stock:</h3>
        <ul>
            ${ticketData.noStock.map((item) => `<li>${item.product.title} (Cantidad: ${item.quantity})</li>`).join("")}
        </ul>
    </div>
    `;

    const ticketInfoElement = document.getElementById("ticketInfo");
    ticketInfoElement.innerHTML = ticketTemplate;
}
