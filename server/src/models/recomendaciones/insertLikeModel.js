const { getConnection } = require('../../db/getConnection');

//Importamos error

const { likeAlreadyExistsError } = require('../../services/errorService');

const insertLikeModel = async (recomendacionId, usuarioId) => {
    let connection;

    try {
        connection = await getConnection();

        // Comprobamos si el usuario ya ha dado Like
        const likes = await connection.query(
            `SELECT id FROM likes WHERE recomendacionId = ? AND usuarioId = ?`,
            [recomendacionId, usuarioId]
        );

        if (likes.length > 0) {
            likeAlreadyExistsError();
        }

        await connection.query(
            `INSERT INTO likes(recomendacionId, usuarioId) VALUES(?, ?)`,
            [recomendacionId, usuarioId]
        );
    } finally {
        if (connection) connection.release();
    }
};


module.exports = insertLikeModel;
