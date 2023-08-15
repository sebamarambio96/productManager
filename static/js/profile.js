let cartID;
const serverSocket = io("http://localhost:8080");
const loginForm = document.getElementById("login");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;
    login(username, pass);
});

const registerForm = document.getElementById("register");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("registerUser").value;
    const pass = document.getElementById("registerPass").value;
    const first_name = document.getElementById("registerFirts").value;
    const last_name = document.getElementById("registerLast").value;
    const age = document.getElementById("registerAge").value;
    register(username, pass, first_name, last_name, age);
});

function login(username, pass) {
    const data = { username, pass };
    fetch("http://localhost:8080/profile/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.message === "cookie set") {
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: `Has iniciado session`,
                });
                window.location.href = "/products";
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${res.description}`,
                });
            }
        })
        .catch((err) => console.log(err));
}
function register(user, pass, first_name, last_name, age) {
    const data = { user, pass, first_name, last_name, age, role: "" };
    fetch("http://localhost:8080/profile/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.message == "Usuario registrado") {
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: `Ya puedes ingresar`,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `No has ingresado`,
                });
            }
        })
        .catch((err) => console.log(err));
}
