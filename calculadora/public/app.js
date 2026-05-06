function agregar(valor) {
    const pantalla = document.getElementById('pantalla');
    pantalla.value += valor;
}

function calcular() {
    const pantalla = document.getElementById('pantalla');
    try {
        pantalla.value = eval(pantalla.value);
    } catch (e) {
        pantalla.value = 'Error';
    }
}

function limpiar() {
    document.getElementById('pantalla').value = '';
}
