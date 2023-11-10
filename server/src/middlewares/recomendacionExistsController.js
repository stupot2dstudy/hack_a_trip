const { getConnection } = require('../db/getConnection');
const { notFoundError } = require('../services/errorService');

const recomendacionExistsController = async (req, res, next) => {
    let connection;

    try {
        connection = await getConnection();

        const { recomendacionId } = req.params;

        const [recomendaciones] = await connection.query(
            `SELECT id FROM recomendaciones where id = ?`,
            [recomendacionId]
        );

        if (!recomendaciones || recomendaciones.length < 1) {
            notFoundError('recomendacion');
        }

        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = recomendacionExistsController;
