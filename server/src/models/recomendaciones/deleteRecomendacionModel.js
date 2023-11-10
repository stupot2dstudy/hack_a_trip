// Importamos BBDD
const { getConnection } = require('../../db/getConnection');

//Importamos errores
const { unauthorizedUserError } = require('../../services/errorService');

//Funcion que conectara con BBDD y eliminara la recomendacion
const deleteRecomendacionModel = async (usuarioId, recomendacionId) => {
    let connection;
    try {
        connection = await getConnection();

        const [recomendaciones] = await connection.query(
            `SELECT usuarioId FROM recomendaciones WHERE id= ?`,
            [recomendacionId]
        );

        if (!recomendaciones || !recomendaciones[0]) {
            // Check if 'recomendaciones' is falsy or if the first element is undefined
            // Handle this case as appropriate, such as throwing an error or returning early
            // For example, you can throw a not found error:
            throw new Error('Recomendacion not found');
        }

        //Si no somos dueños de la recomendacion, lanzamos un error
        if (recomendaciones[0].usuarioId !== usuarioId) {
            unauthorizedUserError();
        }

        // Rest of your code for deleting likes and the recommendation
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteRecomendacionModel;
