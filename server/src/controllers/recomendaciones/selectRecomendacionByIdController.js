// selectRecomendacionByIdController
// Importa tu función de modelo
const { selectAllRecomendacionModel } = require('../../models/recomendaciones/index');

// Define la función controladora para obtener una única recomendación por su ID
const selectRecomendacionByIdController = async (req, res, next) => {
    try {
        // Extrae el ID de la recomendación de los parámetros de consulta de la solicitud
        const { id } = req.query;

        // Valida si el ID se proporciona y es un número válido
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ status: 'error', message: 'ID de recomendación no válido' });
        }

        // Llama a la función del modelo para recuperar la recomendación por su ID
        const recomendaciones = await selectAllRecomendacionModel('', req.recomendacion?.id);

        // Encuentra la recomendación con el ID proporcionado
        const singleRecomendacion = recomendaciones.find((recomendacion) => recomendacion.id === Number(id));

        // Comprueba si se encontró una recomendación con el ID especificado
        if (singleRecomendacion) {
            res.json({ status: 'ok', data: singleRecomendacion });
        } else {
            res.status(404).json({ status: 'error', message: 'Recomendación no encontrada' });
        }
    } catch (err) {
        next(err);
    }
};

// Exporta la función controladora
module.exports = selectRecomendacionByIdController;
