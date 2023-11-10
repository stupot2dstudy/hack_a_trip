const express = require('express');  // Importa el módulo 'express'.
const app = express();  // Crea una instancia de la aplicación Express.
const bodyParser = require('body-parser');  // Importa el módulo 'body-parser'.

app.use(bodyParser.json());  // Configura la aplicación para usar 'body-parser' con formato JSON.

app.post('/', (req, res) => {
    const { username, email } = req.body;  // Extrae el nombre de usuario y el correo electrónico del cuerpo de la solicitud
    console.log(`Username: ${username}, Email: ${email}`); // Registra los valores en la consola del servidor
    res.send('Data received');  //Enviar una respuesta al cliente
});






