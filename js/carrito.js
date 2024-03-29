const mostrarCarrito = () =>{
    modalContainer.innerHTML= "";
    modalContainer.style.display = 'flex'
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.innerHTML = `<h2 class="modal-header-title">Resumen de su compra</h2>`;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement('h3');
    modalButton.className = 'modal-header-button';
    modalButton.innerText = '✖';
    modalHeader.append(modalButton);

    modalButton.addEventListener('click', ()=>{
        modalContainer.style.display = 'none';
    })

    carrito.forEach((product)=>{

        const {img,nombre,precio,cantidad,id} = product

        let carritoContent = document.createElement('div');
        carritoContent.className = 'modal-content';
        carritoContent.innerHTML = `<img class="imagen-modal" src="${img}">
        <h3>${nombre}</h3>
        <p>$${precio}</p>
        <span class= "restar"> - </span>
        <p>Cantidad: ${cantidad}</p>
        <span class= "sumar"> + </span>
        <p>SubTotal:${cantidad * precio}</p>
        <span class= "delete-product"> ❌ </span>`;

        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector('.restar');
        restar.addEventListener('click', ()=>{
            if(product.cantidad !== 1){
                product.cantidad--;
                saveLocal();
                mostrarCarrito();
            }
        } )

        let sumar = carritoContent.querySelector('.sumar');
        sumar.addEventListener('click', ()=>{
            product.cantidad++;
            saveLocal();
            mostrarCarrito();
        })

        let eliminar = carritoContent.querySelector('.delete-product');
        eliminar.addEventListener('click', ()=>{
            eliminarProducto(product.id)
        })
    })
        
    const total = carrito.reduce((acc,el)=> acc + el.precio * el.cantidad, 0); 
    const totalCompra = document.createElement('div');
    totalCompra.className = 'total-content';
    totalCompra.innerText = `Total a pagar: $${total}`;
    modalContainer.append(totalCompra);

    const checkout = document.createElement('button');
    checkout.className = 'checkout';
    checkout.innerText = 'Finalizar compra'.toUpperCase();
    modalContainer.append(checkout);

    checkout.addEventListener('click', ()=>{
        if(total === 0){
            Swal.fire({
                position: "center",
                title: 'Su carrito está vacío  ☹',
                text: '¡Lo invitamos a ver nuestros productos!',
                showConfirmButton: true,
                confirmButtonColor: '#a06f2f'
            });
        } else{
            Swal.fire({
                position: "center",
                title: "¿Desesa finalizar su compra?",
                text: `El total de su compra es $${total}`,
                width: '25em',
                icon: "info",
                iconColor:"#a06f2f",
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: "#a06f2f",
                cancelButtonColor: "#333",
                confirmButtonText: "Sí",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "¡Gracias por su compra!",
                        icon: "success",
                        width: '18em',
                        iconColor:"#a06f2f",
                        showConfirmButton: false,
                    })
                setTimeout(()=>{
                    localStorage.removeItem('carrito')
                    window.location.reload()
                },3000)
            }})
        }
        
    })
};

verCarrito.addEventListener('click', mostrarCarrito);

const eliminarProducto = (id)=>{
    const foundId = carrito.find((element)=>element.id === id);

    carrito = carrito.filter((carritoId)=>{
        return carritoId !== foundId;
    })
    carritoCounter();
    saveLocal();
    mostrarCarrito();
};

const carritoCounter = () =>{
    cantidadCarrito.style.display = 'block';
    const carritoLength = carrito.length;
    localStorage.setItem('carritoLength', JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem('carritoLength'));
}

carritoCounter();