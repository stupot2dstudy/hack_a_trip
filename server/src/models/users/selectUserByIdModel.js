// Importa el módulo de conexión a la base de datos
const { getConnection } = require('../../db/getConnection');

// Importa la función de manejo de errores
const { notFoundError } = require('../../services/errorService.js');

// Función para seleccionar un usuario por su ID en la base de datos
const selectUserByIdModel = async (id) => {
    let connection;

    try {
        // Establece una conexión a la base de datos
        connection = await getConnection();

        // Consulta la base de datos para seleccionar un usuario por su ID
        const usuarios = await connection.query(
            `SELECT id, username, email, avatar FROM usuarios WHERE id = ?`,
            [id]
        );

        // Si no se encuentra ningún usuario con el ID proporcionado, genera un error de "no encontrado"
        if (usuarios.length < 1) {
            notFoundError('usuario');
        }

        // Devuelve el ID del usuario
        return usuarios[0];
    } finally {
        // Asegura que la conexión a la base de datos se libere, ya sea que haya ocurrido un error o no
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdModel;
