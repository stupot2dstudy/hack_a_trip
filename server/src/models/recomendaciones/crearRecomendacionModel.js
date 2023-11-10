//Importamos la conexion con base de datos
const { getConnection } = require('../../db/getConnection');

const crearRecomendacionModel = async (
    titulo,
    tipo,
    foto,
    descripcion,
    usuarioId
) => {
    // Creamos una variable para almacenar la conexion libre
    let connection;
    try {
        //Hacemos la conexion con base de datos
        connection = await getConnection();

        //Creamos la recomendacion en Base de Datos
        const recomendacion = await connection.query(
            `INSERT INTO recomendaciones(titulo, tipo, foto, descripcion, usuarioId) VALUES (?, ?, ?, ?, ?)`,
            [titulo, tipo, foto, descripcion, usuarioId]
        );

        // Retornamos el id de la recomendacion que acabamos de insertar.
        return recomendacion.insertId;
    } finally {
        if (connection) connection.release();
    }
};
module.exports = crearRecomendacionModel;
