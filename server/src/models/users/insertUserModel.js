// Importa el módulo de conexión a la base de datos
const { getConnection } = require('../../db/getConnection');

// Importa la biblioteca bcrypt para el hash de contraseñas
const bcrypt = require('bcrypt');

// Función para conectar con la base de datos y crear un nuevo usuario
const insertUserModel = async (username, email, password) => {
    // Crea una variable para almacenar la conexión a la base de datos
    let connection;

    try {
        // Establece una conexión con la base de datos
        connection = await getConnection();

        // Comprueba si ya existe un usuario con el mismo nombre de usuario en la base de datos
        let usuariosConMismoUsuario = await connection.query(
            `SELECT id FROM usuarios WHERE username = ?`,
            [username]
        );

        // Si ya existe un usuario con el mismo nombre de usuario, lanza un error
        if (usuariosConMismoUsuario.length > 0) {
            const err = new Error('Un usuario con este nombre de usuario ya existe');
            err.httpStatus = 409; // Conflicto
            throw err;
        }

        // Comprueba si ya existe un usuario con el mismo correo electrónico en la base de datos
        let usuariosConMismoEmail = await connection.query(
            `SELECT id FROM usuarios WHERE email = ?`,
            [email]
        );

        // Si ya existe un usuario con el mismo correo electrónico, lanza un error
        if (usuariosConMismoEmail.length > 0) {
            const err = new Error('Un usuario con este correo electrónico ya existe');
            err.httpStatus = 409; // Conflicto
            throw err;
        }

        // Realiza el hash de la contraseña usando bcrypt
        const contraseñaHasheada = await bcrypt.hash(password, 10);

        // Crea el usuario en la base de datos
        await connection.query(
            `INSERT INTO usuarios(username, email, password) VALUES(?, ?, ?)`,
            [username, email, contraseñaHasheada]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserModel;
