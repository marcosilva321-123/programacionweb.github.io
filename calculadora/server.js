const express = require('express');
const app = express();
const PORT = 3000;

// Sirve todos los archivos de la carpeta public
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:' + PORT);
});
