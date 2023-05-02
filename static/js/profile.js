let cartID
const serverSocket = io('http://localhost:8080')
const loginForm = document.getElementById('login')

loginForm.addEventListener('submit', e => {
    e.preventDefault()
    const username = document.getElementById('loginUser').value
    const pass = document.getElementById('loginPass').value
    login(username, pass)
})

const registerForm = document.getElementById('register')

registerForm.addEventListener('submit', e => {
    e.preventDefault()
    const username = document.getElementById('registerUser').value
    const pass = document.getElementById('registerPass').value
    register(username, pass)
})


function login(username, pass) {
    const data = { username, pass }
    fetch('http://localhost:8080/profile/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            window.location.href = '/products'
        })
        .catch(err=>console.log(err))
}

function register(user, pass) {
    const data = { user, pass }
    console.log(user, pass)
    fetch('http://localhost:8080/profile/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.message == 'Usuario registrado') {
                Swal.fire({
                    icon: 'success',
                    title: 'Genial!',
                    text: `Ya puedes ingresar`
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `No has ingresado sesión`
                })
            }
        })
        .catch(err=>console.log(err))
}
