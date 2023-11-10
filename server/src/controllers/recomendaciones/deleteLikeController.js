// Importamos modelos

const { deleteLikeModel } = require('../../models/recomendaciones/index');

// Importamos errores

//Funcion controladora que elimina un like
const deleteLikeController = async (req, res, next) => {
    try {
        // obtenemos el ide de la recomendacion.
        const { recomendacionId } = req.params;

        await deleteLikeModel(recomendacionId, req.user.id);


        res.send({
            status: 'ok',
            message: 'Like eliminado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteLikeController;
