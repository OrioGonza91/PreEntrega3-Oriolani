const signupForm = document.querySelector('#signupForm')

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const isUserRegistered = users.find(user => user.email === email)
    if (isUserRegistered) {
        return Swal.fire({
            position: "center",
            icon: "error",
            iconColor:"#a06f2f",
            title: "¡El usuario ya está registrado!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    users.push({
        name: name,
        email: email,
        password: password
    })
    localStorage.setItem('users', JSON.stringify(users))
    Swal.fire({
        position: "center",
        icon: "success",
        iconColor:"#a06f2f",
        title: "¡Registro exitoso!",
        showConfirmButton: false,
        timer: 2000
    })
    setTimeout(()=>{
        window.location.href = 'index.html'
    }, 2500)
})