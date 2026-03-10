var numeroSecreto = Math.floor(Math.random() * 10) + 1
var intentos = 3
var adivinado = false


while (intentos > 0 && adivinado == false) {

    var intento = parseInt(prompt("Adivina el numero (1-10) — Intentos restantes " + intentos))

    if (intento == numeroSecreto) {
        adivinado = true
        console.log("CORRECTO El numero era " + numeroSecreto)
    } else {
        intentos--
        console.log("Fallaste. Intentos restantes " + intentos)
    }
}

if (adivinado == true) {
    console.log("Adivinaste el numero")
} else {
    console.log("El numero era " + numeroSecreto)
}
