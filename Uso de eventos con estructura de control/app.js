function generarLista() {
    const input = prompt('¿Cuantos elementos quieres en la lista?');
    if (input === null) return;

    const numero = Number(input);

    if (isNaN(numero) || numero < 1) {
        alert('Ingresa un numero valido mayor a 0.');
        return;
    }

    let lista = '<ol>';
    for (let i = 1; i <= numero; i++) {
        lista += '<li>Elemento ' + i + '</li>';
    }
    lista += '</ol>';

    document.getElementById('resultado').innerHTML = lista;
}