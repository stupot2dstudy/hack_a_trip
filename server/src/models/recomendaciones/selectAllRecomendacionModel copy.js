// models/recomendaciones/index.js
// Importamos la conexión a la base de datos
const { getConnection } = require('../../db/getConnection');

const selectAllRecomendacionModel = async (keyword = '', usuarioId = 0, searchValue) => {
    let connection;
    try {
        connection = await getConnection();

        let sqlQuery = `
            SELECT
                r.id,
                r.foto,
                r.titulo,
                r.tipo,
                r.descripcion,
                r.usuarioId,
                u.username,
                r.usuarioId = ? AS owner,
                COUNT(l.id) AS likes,
                BIT_OR(l.usuarioId = ?) AS likedByMe,
                r.created_at
            FROM recomendaciones r
            INNER JOIN usuarios u ON u.id = r.usuarioId
            LEFT JOIN likes l ON l.recomendacionId = r.id
            WHERE (`;

        // Create a list of columns to search (you can customize this list)
        const columnsToSearch = ['u.username', 'r.titulo', 'r.id']; // Add more columns as needed

        // Build the SQL query to search in all specified columns
        sqlQuery += columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');

        sqlQuery += ') GROUP BY r.id;';

        const searchKeywords = columnsToSearch.map(_ => `%${keyword}%`);

        const params = [usuarioId, usuarioId, ...searchKeywords];

        const recomendaciones = await connection.query(sqlQuery, params);

        for (const recomendacion of recomendaciones) {
            recomendacion.likes = Number(recomendacion.likes);
            recomendacion.owner = Boolean(recomendacion.owner);
            recomendacion.likedByMe = Boolean(recomendacion.likedByMe);
        }

        return recomendaciones;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllRecomendacionModel;
