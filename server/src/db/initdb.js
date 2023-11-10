require('dotenv').config();
const { getConnection } = require('./getConnection');

// Leer variables de entorno desde .env
const mariadb_HOST = process.env.mariadb_HOST;
const mariadb_USER = process.env.mariadb_USER;
const mariadb_PASSWORD = process.env.mariadb_PASSWORD;
const mariadb_DATABASE = process.env.mariadb_DATABASE;

async function main() {
    let connection;

    try {
        connection = await getConnection({
            host: mariadb_HOST,
            user: mariadb_USER,
            password: mariadb_PASSWORD,
            database: mariadb_DATABASE, // Usar el nombre de la base de datos desde .env
        });

        console.log(connection);

        console.log('Base de datos si existe');
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${mariadb_DATABASE}`);
        await connection.query(`USE ${mariadb_DATABASE}`);

        console.log('Creando tablas si no existen');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS usuarios(
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username varchar(50) UNIQUE NOT NULL,
                email varchar(50) UNIQUE NOT NULL,
                password varchar(100) NOT NULL,
                avatar varchar(255),
                created_at datetime default current_timestamp,
                modified_at datetime on update current_timestamp
            );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS recomendaciones (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                titulo varchar(50) NOT NULL,
                tipo enum('gastronómico', 'museos') NOT NULL,
                foto varchar(100),
                descripcion varchar(255),
                usuarioId INT UNSIGNED NOT NULL,
                created_at datetime default current_timestamp,
                modified_at datetime on update current_timestamp,
                FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
            );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS likes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                puntuacion INT UNSIGNED,
                usuarioId INT UNSIGNED NOT NULL,
                recomendacionId INT UNSIGNED NOT NULL,
                created_at datetime default current_timestamp,
                modified_at datetime on update current_timestamp,
                FOREIGN KEY (usuarioId) REFERENCES usuarios(id),
                FOREIGN KEY (recomendacionId) REFERENCES recomendaciones(id)
            );
        `);

        console.log('Tablas creadas o ya existen');
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();
