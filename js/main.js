const shopContent = document.getElementById('shopContent'),
    verCarrito = document.getElementById('verCarrito'),
    modalContainer = document.getElementById('modalContainer'),
    cantidadCarrito = document.getElementById('cantidadCarrito'),
    logout = document.querySelector('#btn-logout')

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//Asincronía
fetch("./db/db.json")
.then((res)=> res.json())
.then((data)=>{
    const{productos} = data
    productos.forEach((product) => {
        let content = document.createElement('div');
        content.className = 'card';
        content.innerHTML = `<img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price">$${product.precio}</p>
        `;
    
        shopContent.append(content);
    
        let comprar = document.createElement('button');
        comprar.className = 'comprar';
        comprar.innerText = 'Comprar'.toUpperCase();
        content.append(comprar);
    
        comprar.addEventListener('click', () => {
    
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
    
            Toastify({
                text: "¡Producto agregado!",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #897C6B, #121212)",
                },
                onClick: function () {} // Callback after click
            }).showToast();
    
            if (repeat) {
                carrito.map((prod) => {
                    if (prod.id === product.id) {
                        prod.cantidad++;
                    }
                })
            } else {
                carrito.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                });
            }
            carritoCounter();
            saveLocal();
        });
    });
})



//Guardo carrito en el localStorage
const saveLocal = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const user = JSON.parse(localStorage.getItem('login_success')) || false
if (!user) {
    window.location.href = 'index.html'
}

logout.addEventListener('click', () => {
    Swal.fire({
        position: "top",
        title: "¿Quiere cerrar sesión?",
        text: "Si tiene productos en el carrito, serán removidos",
        width: '25em',
        icon: "warning",
        iconColor:"#a06f2f",
        showCancelButton: true,
        confirmButtonColor: "#a06f2f",
        cancelButtonColor: "#333",
        confirmButtonText: "Sí",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¡Hasta pronto!",
                icon: "success",
                width: '18em',
                iconColor:"#a06f2f",
                showConfirmButton: false
            })
            localStorage.removeItem('login_success')
            localStorage.removeItem('carrito')
            setTimeout(() => {
                window.location.href = 'index.html'
            }, 2500)
        }
    })

})