fetch('http://localhost:8080/profile/session')
    .then(res => res.json())
    .then(res => {
        console.log(res)
        if (res.auth) {
            Swal.fire({
                icon: 'success',
                title: 'Genial!',
                text: `Bienvenido ${res.info.user}!!!\n Rol: ${res.info.admin ? 'Admin' : 'Usuario'}`
            })
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${res.message}`
            })
        }
    })