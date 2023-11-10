// Importamos los modelos.
const { selectAllRecomendacionModel } = require('../../models/recomendaciones/index');

// Función controladora final que selecciona todos los recomendaciones.
const listRecomendaionesController = async (req, res, next) => {
    try {
        const { keyword, searchBy, id, likes } = req.query;

        const recomendaciones = await selectAllRecomendacionModel(keyword, req.user?.id, searchBy, id || likes);

        res.send({
            status: 'ok',
            data: {
                recomendaciones,
            },
        });
    } catch (err) {
        next(err);
    }
};
module.exports = listRecomendaionesController;
