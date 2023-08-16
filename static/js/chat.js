const serverSocket = io();

fetch("https://productmanager.up.railway.app/profile/current")
    .then((res) => res.json())
    .then((res) => {
        if (res.first_name) {
            const inputAutor = document.getElementById("inputUser");
            if (!(inputAutor instanceof HTMLInputElement)) return;
            inputAutor.value = res.user;
            serverSocket.emit("newUser", inputAutor.value);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `¡Necesitas iniciar sesión para comenzar a chatear!`,
            });
        }
    });

if (btnSend) {
    btnSend.addEventListener("click", (e) => {
        fetch("https://productmanager.up.railway.app/profile/current")
            .then((res) => res.json())
            .then((res) => {
                if (res.first_name) {
                    const inputUser = document.getElementById("inputUser");
                    const inputMessage = document.getElementById("inputMessage");
                    const user = inputUser.value;
                    const message = inputMessage.value;
                    //Validamos que exista
                    if (!user || !message) return;
                    serverSocket.emit("newMessage", { user, message });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `¡Necesitas iniciar sesión para comenzar a chatear!`,
                    });
                }
            });
    });
}

const template = `
{{#if hayMensajes }}
<div class="card">
    {{#each messages}}
        <div class="card-body"><span class="fw-bold">{{this.user}} dice:</span> {{this.message}}</div>
    {{/each}}
</div>
{{else}}
<p>Se el primero en hablar</p>
{{/if}}
`;
const addMessage = Handlebars.compile(template);

serverSocket.on("updateMessage", (messages) => {
    const messageContainer = document.getElementById("messages");
    if (messageContainer) {
        messageContainer.innerHTML = addMessage({ messages, hayMensajes: messages.length > 0 });
    }
});

serverSocket.on("newUser", (username) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        title: `"${username}" Ha ingresado a la sala`,
        icon: "success",
    });
});
