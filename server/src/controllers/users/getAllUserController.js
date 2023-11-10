const { selectAllUserModel } = require('../../models/users/');

// Controlador para obtener todos los usuarios
const getAllUserController = async (req, res, next) => {
    try {
        // Obtener todos los usuarios desde el modelo
        const users = await selectAllUserModel();

        res.send({
            status: 'ok',
            data: {
                users,
            },
        });
    } catch (error) {
        // Manejar errores, puedes personalizar esto según tus necesidades
        console.error(error);
        next(error);
    }
};

module.exports = getAllUserController;
