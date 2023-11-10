require('dotenv').config();

//Conexiones con express y morgan
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');

//Importamos la constante que contiene el nombre de la carpeta de subida de archivos
// const{UPLOADS_DIR} = require('./uploads')
const { UPLOADS_DIR } = require('./src/utils/constantesUtils');

const routes = require('./src/routes');

const {
    notFoundController,
    errorController,
} = require('./src/controllers/errors');


const app = express();

app.use(express.static(UPLOADS_DIR));

app.use(express.json()); //raw

app.use(fileUpload());

app.use(morgan('dev'));


// Middleware que evita problemas con las CORS cuando intentamos conectar el cliente con el servidor.
app.use(cors());

// Middleware que indica a express donde se encuentran las rutas.
app.use(routes);

// Middleware de ruta no encontrada.
app.use(notFoundController);

// Middleware de error.
// eslint-disable-next-line no-unused-vars
app.use(errorController);

//Lanzamos el servidor

app.listen(process.env.PORT, () => {
    console.log(`Servidor funcionando: http://localhost:${process.env.PORT}`);
});
