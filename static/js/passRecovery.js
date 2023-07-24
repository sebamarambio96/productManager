let cartID;
const serverSocket = io("http://localhost:8080");
//Forms
const passRecoveryMailForm = document.getElementById("passRecoveryMail");
const passRecoveryVerifyForm = document.getElementById("passRecoveryVerify");

//Events
passRecoveryMailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    console.log(username);
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
    fetch("http://localhost:8080/msg/passRecoveryMail", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
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
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${err.message}`,
            });
        });
}

function passRecoveryVerify(token, newPassword) {
    console.log({ token, pass: newPassword});
    const data = { token, pass: newPassword };
    fetch("http://localhost:8080/msg/passRecoveryVerify", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
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
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${err.message}`,
            });
        });
}
