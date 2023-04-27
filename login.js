function login() {
    const btn = document.getElementById('btnSendLogin')
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value

        const data = {
            email,
            password
        }

        if (!Object.values(data).every(value => value != '')) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes rellenar todos los campos!'
            })
        } else {
            fetch(`http://18.223.117.204/login/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(res => {
                    if (res.auth) {
                        console.log(res)
                        localStorage.setItem('token', JSON.stringify(res.token))
                        Swal.fire({
                            icon: 'success',
                            title: 'Genial!',
                            text: `Has ingresado correctamente`
                        })
                        let carritoGuardado = JSON.parse(localStorage.getItem('compras'))
                        if (carritoGuardado) {
                            const arrayComprasServer = carritoGuardado.map(producto => {
                                const objeto = {
                                    id_product: producto.id,
                                    quantity: producto.cantidad
                                }
                                return objeto
                            })
                            fetch(`http://18.223.117.204/cart`, {
                                method: 'POST',
                                headers: {
                                    'Content-type': 'application/json',
                                    'x-access-token': res.token
                                },
                                body: JSON.stringify(arrayComprasServer)
                            })
                                .then(res => {
                                    localStorage.setItem('contador', JSON.stringify(contadorInterno))
                                    localStorage.setItem('compras', JSON.stringify(arrayCompras))
                                    localStorage.setItem('carrito', JSON.stringify(carrito))
                                })
                                .catch(err => console.log(err))
                        }
                        location.href = "/products.html"
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${res.message}`
                        })
                    }
                })
                .catch(err => console.log(err))
        }
    })
}
login()