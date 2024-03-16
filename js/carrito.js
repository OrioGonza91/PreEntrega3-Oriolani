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
            if(cantidad !== 1){
                cantidad--;
                saveLocal();
                mostrarCarrito();
            }
        } )

        let sumar = carritoContent.querySelector('.sumar');
        sumar.addEventListener('click', ()=>{
            cantidad++;
            saveLocal();
            mostrarCarrito();
        })

        let eliminar = carritoContent.querySelector('.delete-product');
        eliminar.addEventListener('click', ()=>{
            eliminarProducto(id)
        })
        // let eliminar = document.createElement('span');
        // eliminar.innerText ='❌';
        // eliminar.className= 'delete-product';
        // carritoContent.append(eliminar);

        // eliminar.addEventListener('click', eliminarProducto)
    })
        
    const total = carrito.reduce((acc,el)=> acc + el.precio * el.cantidad, 0); 
    const totalCompra = document.createElement('div');
    totalCompra.className = 'total-content';
    totalCompra.innerText = `Total a pagar: $${total}`;
    modalContainer.append(totalCompra);
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