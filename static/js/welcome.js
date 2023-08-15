fetch("http://localhost:8080/profile/current")
    .then((res) => res.json())
    .then((res) => {
        if (res.first_name) {
            Swal.fire({
                icon: "success",
                title: "Genial!",
                text: `Bienvenido ${res.first_name}!!!\n Rol: ${res.role}`,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${res.message}`,
            });
        }
    });
