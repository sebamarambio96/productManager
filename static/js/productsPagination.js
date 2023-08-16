const serverSocket = io("http://localhost:8080");
let cartSave = localStorage.getItem("cartID");
const allCookies = document.cookie;

fetch("http://localhost:8080/profile/current")
    .then((res) => res.json())
    .then((res) => {
        if (res.cart && res.cart !== "") {
            localStorage.setItem("cartID", res.cart);
        } else if (!cartSave) {
            fetch("http://localhost:8080/api/carts/", {
                method: "POST",
            })
                .then((res) => res.json())
                .then((res) => {
                    localStorage.setItem("cartID", res._id);
                });
        }
    });

function listenAddButtons() {
    const buttons = document.querySelectorAll(".btn-info");
    buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const quantityInput = document.getElementById(`quantity_${btn.id}`);
            if (quantityInput) {
                const data = {
                    quantity: parseInt(quantityInput.value),
                };
                fetch(`http://localhost:8080/api/carts/${cartSave}/product/${btn.id}`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                    .then((res) => res.json())
                    .then((res) => {});
            }
        });
    });
}

listenAddButtons();
