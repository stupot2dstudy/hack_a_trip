const { selectUserByIdModel } = require('../../models/users');

// Controlador para obtener un usuario por su ID
const getUserController = async (req, res, next) => {
    try {
        // Obtener el usuario por su ID
        const user = await selectUserByIdModel(req.user.id);

        res.send({
            status: 'ok',
            data: user


        });
    } catch (err) {
        next(err);
    }
};

module.exports = getUserController;
