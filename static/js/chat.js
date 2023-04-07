const serverSocket = io()

Swal.fire({
    title: 'Ingresa un correo:',
    input: 'email',
    inputLabel: 'ejemplo@ejemplo.com',
    inputPlaceholder: 'ejemplo@ejemplo.com',
    inputValidator: (value) => {
        return !value && "¡Necesitas escribir un correo para comenzar a chatear!"
    },
    allowOutsideClick: false
}).then(res => {
    const inputAutor = document.getElementById('inputUser')
    if (!(inputAutor instanceof HTMLInputElement)) return
    inputAutor.value = res.value
    serverSocket.emit('newUser', inputAutor.value)
})


if (btnSend) {
    btnSend.addEventListener('click', e => {
        const inputUser = document.getElementById('inputUser')
        const inputMessage = document.getElementById('inputMessage')
        const user = inputUser.value
        const message = inputMessage.value
        //Validamos que exista
        if (!user || !message) return
        serverSocket.emit('newMessage', { user, message })
    })
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
`
const addMessage = Handlebars.compile(template)

serverSocket.on('updateMessage', messages => {
    console.log(messages)
    const messageContainer = document.getElementById('messages')
    if (messageContainer) {
        messageContainer.innerHTML = addMessage({ messages, hayMensajes: messages.length > 0 })
    }
})

serverSocket.on('newUser', username => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `"${username}" Ha ingresado a la sala`,
        icon: "success"
    })
})