const { getConnection } = require('../../db/getConnection');

//Importamos error

const { notFoundError } = require('../../services/errorService');

const deleteLikeModel = async (recomendacionId, usuarioId) => {
    let connection;

    try {
        connection = await getConnection();

        // Comprobamos si el usuario ya ha dado Like
        const likes = await connection.query(
            `SELECT id FROM likes WHERE recomendacionId = ? AND usuarioId = ?`,
            [recomendacionId, usuarioId]
        );

        if (likes.length < 1) {
            notFoundError('like');
        }

        await connection.query(
            `DELETE FROM likes WHERE recomendacionId = ? AND usuarioId = ?`,
            [recomendacionId, usuarioId]
        );
    } finally {
        if (connection) connection.release();
    }
};
module.exports = deleteLikeModel;
