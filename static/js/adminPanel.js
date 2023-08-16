const socket = io("https://productmanager.up.railway.app");

fetch("https://productmanager.up.railway.app/profile/current")
    .then((res) => res.json())
    .then((res) => {
        if (res.role === "admin") {
            const adminPanel = document.getElementById("adminPanel");
            adminPanel.classList.remove("hidden");
        }
    });

//DELETE USER
const btnDelete = document.getElementById("btnDelete");
if (btnDelete) {
    btnDelete.addEventListener("click", () => {
        const id = document.getElementById("id_delete").value;
        if (id != "") {
            fetch(`https://productmanager.up.railway.app/api/users/${id}`, {
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
                    socket.emit("updateUsers");
                });
        }
    });
}

//Change role
const btnChangeRole = document.getElementById("btnChangeRole");
if (btnChangeRole) {
    btnChangeRole.addEventListener("click", () => {
        const id = document.getElementById("id_role").value;
        if (id != "") {
            fetch(`https://productmanager.up.railway.app/api/users/premium/${id}`)
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
                    socket.emit("updateUsers");
                });
        }
    });
}

//Delete inactive users
const btnDeleteInactive = document.getElementById("btnDeleteInactive");
if (btnDeleteInactive) {
    btnDeleteInactive.addEventListener("click", () => {
        fetch(`https://productmanager.up.railway.app/api/users/`, {
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
            });
    });
}

//Renderizar

const template = `
{{#each users}}
                    <tr>
                        <td>{{this._id}}</td>
                        <td>{{this.user}}</td>
                        <td>{{this.role}}</td>
                        <td>{{this.first_name}}</td>
                        <td>{{this.last_name}}</td>
                        <td>{{this.age}}</td>
                        <td>{{this.cart}}</td>
                        <td>{{this.documents}}</td>
                        <td>{{this.last_connection}}</td>
                    </tr>
{{/each}}
`;
const renderUsers = Handlebars.compile(template);

socket.on("updateUsers", (users) => {
    const divUsers = document.getElementById("usersTable");
    if (divUsers) {
        divUsers.innerHTML = renderUsers({ users });
    }
});
