let productos = [
    { nombre: 'Camisa',    precio: 300 },
    { nombre: 'Pantalon',  precio: 500 },
    { nombre: 'Zapatos',   precio: 750 },
    { nombre: 'Sombrero',  precio: 350 }
];

let carrito = [];

function mostrarMenu() {
    let menu = 'Selecciona una opcion:\n\n';
    for (let i = 0; i < productos.length; i++) {
        menu += (i + 1) + '. ' + productos[i].nombre + ' - $' + productos[i].precio + '\n';
    }
    menu += '\n' + (productos.length + 1) + '. Ver carrito y total\n';
    menu += (productos.length + 2) + '. Agregar nuevo producto al catalogo\n';
    menu += (productos.length + 3) + '. Salir';
    return menu;
}

function agregarAlCarrito(index) {
    let producto = productos[index];
    carrito.push(producto);
    alert('Producto agregado: ' + producto.nombre + ' - $' + producto.precio);
}

function mostrarCarritoTotal() {
    if (carrito.length === 0) {
        alert('El carrito esta vacio.');
        return;
    }

    let mensaje = 'Carrito de compras:\n\n';
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        mensaje += (i + 1) + '. ' + carrito[i].nombre + ' - $' + carrito[i].precio + '\n';
        total += carrito[i].precio;
    }
    mensaje += '\nTotal: $' + total;
    alert(mensaje);
}

function agregarProductoCatalogo() {
    const nombre = prompt('Nombre del nuevo producto:');
    if (nombre === null || nombre.trim() === '') {
        alert('Nombre invalido, no se agrego el producto.');
        return;
    }

    const precioTexto = prompt('Precio del producto (solo numeros):');
    if (precioTexto === null) return;

    const precio = Number(precioTexto);
    if (isNaN(precio) || precio <= 0) {
        alert('Precio invalido, no se agrego el producto.');
        return;
    }

    productos.push({ nombre: nombre.trim(), precio: precio });
    alert('Producto "' + nombre.trim() + '" agregado al catalogo con precio $' + precio);
}

function iniciarTienda() {
    let opcion;

    do {
        opcion = prompt(mostrarMenu());
        opcion = Number(opcion);

        if (isNaN(opcion) || opcion < 1 || opcion > productos.length + 3) {
            alert('Opcion no valida.');
        } else if (opcion >= 1 && opcion <= productos.length) {
            agregarAlCarrito(opcion - 1);
        } else if (opcion === productos.length + 1) {
            mostrarCarritoTotal();
        } else if (opcion === productos.length + 2) {
            agregarProductoCatalogo();
        }

    } while (opcion !== productos.length + 3);

    alert('Gracias por su visita.');
}