const productos = [{
    id: 1,
    nombre: "Adidas Gazelle",
    precio: 80000,
    img:'./img/adidasGazelle.jpg',
    cantidad: 1,
},
{   id:2,
    nombre: "Adidas Forum Low",
    precio: 100000,
    img:'./img/adidasForumLow.jpg',
    cantidad: 1,
},
{   id:3,
    nombre: "Remera Adidas Blanca",
    precio: 45000,
    img:'./img/remeraAdidasBlanca.jpg',
    cantidad: 1,
},
{   id:4,
    nombre: "Adidas Superstar",
    precio: 155000,
    img:'./img/adidasSuperstar.jpg',
    cantidad: 1,
},
{   id:5,
    nombre: "Remera Adidas Roja",
    precio: 42000,
    img:'./img/remeraAdidasRoja.jpg',
    cantidad: 1,
},
{   id:6,
    nombre: "Buzo Mujer Adidas Blanco",
    precio: 52000,
    img:'./img/buzoAdidasBlancoMujer.jpg',
    cantidad: 1,
},
];

function Producto(id, nombre, precio, imagen, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.cantidad = cantidad;
}

