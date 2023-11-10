// Importar la función insertUserModel para trabajar con ella en el controlador
const insertUserModel = require('../../models/users/insertUserModel');

// Importar funciones de manejo de errores
const { errorController } = require('../../services/errorService');

// Crear la función del controlador para manejar la lógica principal
const insertUserController = async (req, res, next) => {
    // Desestructurar los campos del cuerpo de la solicitud
    try {
        const { username, email, password } = req.body;

        // Validar los datos utilizando Joi u otro método de validación
        if (!username || !email || !password) {
            errorController();
        }

        // Insertar al usuario
        await insertUserModel(username, email, password);

        res.send({
            status: 'ok',
            message: 'Usuario creado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = insertUserController;
