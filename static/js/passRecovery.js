let cartID;
const serverSocket = io("https://productmanager.up.railway.app");
//Forms
const passRecoveryMailForm = document.getElementById("passRecoveryMail");
const passRecoveryVerifyForm = document.getElementById("passRecoveryVerify");

//Events
passRecoveryMailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;

    passRecoveryMail(username);
});

passRecoveryVerifyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const token = document.getElementById("token").value;
    const newPassword = document.getElementById("newPassword").value;
    passRecoveryVerify(token, newPassword);
});

function passRecoveryMail(username, pass) {
    const data = { username, pass };
    fetch("https://productmanager.up.railway.app/msg/passRecoveryMail", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.message === "Un correo con su código de recuperación ha sido enviado, recuerde revisar SPAM.") {
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: `${res.message}`,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${res.description}`,
                });
            }
        })
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${err.message}`,
            });
        });
}

function passRecoveryVerify(token, newPassword) {
    const data = { token, pass: newPassword };
    fetch("https://productmanager.up.railway.app/msg/passRecoveryVerify", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.message === "Contraseña actualizada exitosamente") {
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: `${res.message}`,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${res.description}`,
                });
            }
        })
        .catch((err) => {
            err = JSON.parse(err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${err.message}`,
            });
        });
}
