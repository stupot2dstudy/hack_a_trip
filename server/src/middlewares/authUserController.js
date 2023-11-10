// Importamos dependencias.
const jwt = require('jsonwebtoken');

// Importamos errores.
const {
    invalidTokenError,
    notAuthenticatedError,
} = require('../services/errorService');

// Funcion controladora intermedia, comprueba si el usuario está autenticado

const authUserController = async (req, res, next) => {
    try {
        // Obtenemos el token de la cabecera de la petición.
        const { authorization } = req.headers;
        if (!authorization) {
            notAuthenticatedError; // 
        }

        // Variable que almacenará la información del token desencriptado.
        let userInfo;
        try {
            userInfo = jwt.verify(authorization, process.env.SECRET);

            // Agregamos una nueva propiedad inventada por nosotros
            req.user = userInfo;

            // Pasamos el control a la siguiente función controladora.
            next();
        } catch (err) {
            console.error(err);
            invalidTokenError(); // 
        }
    } catch (err) {
        next(err);
    }
};

module.exports = authUserController;


