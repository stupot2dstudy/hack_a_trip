// Importa el módulo de conexión a la base de datos
const { getConnection } = require('../../db/getConnection');

// Importa la función de manejo de errores para credenciales inválidas
const { invalidCredentialsError } = require('../../services/errorService.js');

// Función para seleccionar un usuario por su correo electrónico desde la base de datos
const selectUserByEmailModel = async (email) => {
    let connection;

    try {
        // Establece una conexión a la base de datos
        connection = await getConnection();

        // Consulta la base de datos para seleccionar un usuario por su correo electrónico
        const usuarios = await connection.query(
            `SELECT id, password FROM usuarios WHERE email = ?`,
            [email]
        );

        // Si no se encuentra ningún usuario con el correo electrónico proporcionado, genera un error de "credenciales inválidas"
        if (usuarios.length < 1) {
            invalidCredentialsError();
        }

        // Devuelve el ID y la contraseña del usuario
        return usuarios[0];
    } finally {
        // Asegura que la conexión a la base de datos se libere, ya sea que haya ocurrido un error o no
        if (connection) connection.release();
    }
};

module.exports = selectUserByEmailModel;
