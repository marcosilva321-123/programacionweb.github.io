const alumno = {
    id: 987654321,
    nombre: 'Lucia',
    primerApellido: 'Ramirez',
    segundoApellido: 'Hernandez',
    numeroContacto: [5512345678, 5587654321],
    direccion: {
        calle: 'Encino',
        numero: '45',
        colonia: 'San Pedro',
        alcaldia: 'Coyoacan',
        cp: '04100',
        ciudad: 'CDMX',
        pais: 'Mexico'
    },
    educacion: {
        kinder: {
            nombre: 'Estrellitas del Saber',
            publica: false,
            hacerPipi: function () {
                return 'Profe, necesito ir al bano';
            }
        },
        primaria: {
            nombre: 'Benito Juarez',
            publica: true,
            tiempoRecreso: '30 min',
            jugar: function (tipoJuego) {
                return 'Estoy jugando a ' + tipoJuego;
            }
        },
        secundaria: {
            nombre: 'Tecnica 42',
            publica: true,
            pubertos: true,
            serRebeldes: function (accion) {
                return 'Me castigaron por hacer: ' + accion;
            }
        }
    },
    actividadesPersonales: {
        lectura: 'Cien anos de soledad',
        fisica: 'nadar',
        actividadCotidiana: function (horario) {
            return alumno.actividadesPersonales.fisica + ' en el horario de ' + horario;
        }
    }
};


function verAlumno() {
    let info = 'Datos del alumno:\n';
    info += 'ID: ' + alumno.id + '\n';
    info += 'Nombre: ' + alumno.nombre + '\n';
    info += 'Primer apellido: ' + alumno.primerApellido + '\n';

    if (alumno.hasOwnProperty('segundoApellido')) {
        info += 'Segundo apellido: ' + alumno.segundoApellido + '\n';
    } else {
        info += 'Segundo apellido: (eliminado)\n';
    }

    info += 'Contacto 1: ' + alumno.numeroContacto[0] + '\n';
    info += 'Contacto 2: ' + alumno.numeroContacto[1] + '\n';
    info += 'Direccion: ' + alumno.direccion.calle + ' #' + alumno.direccion.numero
          + ', ' + alumno.direccion.colonia + ', ' + alumno.direccion.alcaldia
          + ', ' + alumno.direccion.ciudad + '\n';

    if (alumno.hasOwnProperty('numeroCuenta')) {
        info += 'Numero de cuenta: ' + alumno.numeroCuenta + '\n';
    }

    alert(info);
}

function verEducacion() {
    let info = 'Historial educativo de ' + alumno.nombre + ':\n\n';

    info += 'Kinder: ' + alumno.educacion.kinder.nombre;
    info += alumno.educacion.kinder.publica ? ' (Publica)' : ' (Privada)';
    info += '\n -> ' + alumno.educacion.kinder.hacerPipi() + '\n\n';

    info += 'Primaria: ' + alumno.educacion.primaria.nombre;
    info += ' (Publica)';
    info += '\n -> ' + alumno.educacion.primaria.jugar('Escondidas') + '\n\n';

    info += 'Secundaria: ' + alumno.educacion.secundaria.nombre;
    info += ' (Publica)';
    info += '\n -> ' + alumno.educacion.secundaria.serRebeldes('Faltar a clase') + '\n';

    alert(info);
}

function verActividades() {
    const horario = prompt('¿A que hora hace su actividad fisica? (ej: 06:30 am)');
    if (horario === null) return;

    let info = 'Actividades de ' + alumno.nombre + ':\n';
    info += 'Lectura: ' + alumno.actividadesPersonales.lectura + '\n';
    info += 'Actividad: ' + alumno.actividadesPersonales.actividadCotidiana(horario) + '\n';

    alert(info);
}

function actualizarNombre() {
    const nuevoNombre = prompt('Nombre actual: ' + alumno.nombre + '\nEscribe el nuevo nombre:');
    if (nuevoNombre === null || nuevoNombre.trim() === '') return;

    alumno.nombre = nuevoNombre.trim();
    alert('Nombre actualizado a: ' + alumno.nombre);
}

function agregarDato() {
    if (alumno.hasOwnProperty('numeroCuenta')) {
        alert('El alumno ya tiene numero de cuenta: ' + alumno.numeroCuenta);
        return;
    }

    const cuenta = prompt('Escribe el numero de cuenta a agregar:');
    if (cuenta === null || cuenta.trim() === '') return;

    alumno.numeroCuenta = parseInt(cuenta);
    alert('Numero de cuenta agregado: ' + alumno.numeroCuenta);
}

function eliminarDato() {
    if (!alumno.hasOwnProperty('segundoApellido')) {
        alert('El segundo apellido ya fue eliminado antes.');
        return;
    }

    const confirmar = confirm('¿Eliminar el segundo apellido "' + alumno.segundoApellido + '"?');
    if (confirmar) {
        delete alumno.segundoApellido;
        alert('Segundo apellido eliminado. El alumno ya no tiene esa propiedad.');
    }
}