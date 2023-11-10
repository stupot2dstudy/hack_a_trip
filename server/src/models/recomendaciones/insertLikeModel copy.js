const { getConnection } = require('../../db/getConnection');

// Importamos error

const { likeAlreadyExistsError, likeAddedSuccessfully } = require('../../services/errorService');

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
            // If a like already exists, throw an error
            throw likeAlreadyExistsError();
        }

        // If the user hasn't liked this recommendation, insert a new like
        await connection.query(
            `INSERT INTO likes(recomendacionId, usuarioId) VALUES(?, ?)`,
            [recomendacionId, usuarioId]
        );

        // Notify that the like was added successfully
        likeAddedSuccessfully();
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertLikeModel;
