const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const users = JSON.parse(localStorage.getItem('users')) || []

    const validUser = users.find(user => user.email === email && user.password === password)

    if(!validUser){
        return Swal.fire({
            position: "center",
            icon: "error",
            iconColor:"#a06f2f",
            width: '18em',
            title: "¡Usuario y/o contraseña incorrectos!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    Swal.fire({
        position: "center",
        icon: "success",
        iconColor:"#a06f2f",
        width: '25em',
        title: `Bienvenido/a ${validUser.name}`,
        showConfirmButton: false,
        timer: 2000
    })
    localStorage.setItem('login_success', JSON.stringify(validUser))
    setTimeout(()=>{
        window.location.href = 'products.html'
    }, 3000)
})