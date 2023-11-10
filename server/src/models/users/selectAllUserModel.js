// Importa el módulo de conexión a la base de datos
const { getConnection } = require("../../db/getConnection");

// Función para seleccionar todos los registros de usuarios de la base de datos
const selectAllUserModel = async () => {
    let connection;

    try {
        // Establece una conexión a la base de datos
        connection = await getConnection();

        // Consulta la base de datos para seleccionar todos los registros de usuarios de la tabla "usuarios"
        const users = await connection.query('SELECT * FROM usuarios');

        console.log(users)
        // Si no se encuentran usuarios, registra un mensaje de error (puedes manejar esto de manera diferente según los requisitos de tu aplicación)
        if (users.length < 1) {
            console.error("Los usuarios no se encontraron");
        }

        // Devuelve los registros de usuarios
        return users;
    } finally {
        // Asegura que la conexión a la base de datos se libere, ya sea que haya ocurrido un error o no
        if (connection) connection.release();
    }
};

module.exports = selectAllUserModel;
