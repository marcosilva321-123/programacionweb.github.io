// Catalogo de frutas disponibles
const catalogo = ['Platano', 'Sandia', 'Manzana', 'Mango', 'Naranja', 'Uva', 'Pera'];

// Carrito del usuario
const carrito = [];

// Funcion para generar el menu de frutas como texto
function mostrarCatalogo() {
    let menu = 'Frutas disponibles:\n';
    for (let i = 0; i < catalogo.length; i++) {
        menu += `${i + 1}. ${catalogo[i]}\n`;
    }
    return menu;
}

// Funcion para comprar frutas
function comprarFrutas() {
    let comprandoMas = true;

    while (comprandoMas) {
        const menu = mostrarCatalogo() + '\nEscribe el numero de la fruta que quieres:';
        const input = prompt(menu);

        if (input === null) break; // usuario cancelo

        const numero = parseInt(input);

        if (isNaN(numero) || numero < 1 || numero > catalogo.length) {
            alert('Numero invalido. Intenta de nuevo.');
        } else {
            const frutaElegida = catalogo[numero - 1];
            carrito.push(frutaElegida);
            alert(`"${frutaElegida}" agregada al carrito!`);
        }

        comprandoMas = confirm('¿Quieres agregar otra fruta?');
    }

    if (carrito.length > 0) {
        alert('Puedes ver tu carrito con el boton "Ver carrito".');
    }
}

// Funcion para ver el carrito
function verCarrito() {
    if (carrito.length === 0) {
        alert('Tu carrito esta vacio.');
        return;
    }

    let resumen = 'Tu carrito:\n';
    for (const fruta of carrito) {
        resumen += `- ${fruta}\n`;
    }
    resumen += `\nTotal de frutas: ${carrito.length}`;
    alert(resumen);
}

// Funcion para vaciar el carrito
function vaciarCarrito() {
    if (carrito.length === 0) {
        alert('El carrito ya esta vacio.');
        return;
    }

    const confirmar = confirm('¿Seguro que quieres vaciar el carrito?');
    if (confirmar) {
        carrito.length = 0;
        alert('Carrito vaciado.');
    }
}