# Node.js API con MariaDB

Esta es una aplicación Node.js que proporciona una API básica para interactuar con una base de datos MariaDB. La API incluye funcionalidades como la creación de tablas en la base de datos y un punto de enlace para verificar si el servidor está funcionando correctamente.

## Requisitos previos

Asegúrate de tener instalados los siguientes requisitos previos antes de ejecutar la aplicación:

- **Node.js**: El entorno de ejecución de JavaScript.
- **MariaDB**: Un sistema de gestión de bases de datos relacionales (RDBMS).

## Configuración

### Variables de entorno

La aplicación utiliza variables de entorno para configurar la conexión a la base de datos y el puerto del servidor. Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables:

    dotenv
    mariadb_HOST=your_database_host
    mariadb_USER=your_database_user
    mariadb_PASSWORD=your_database_password
    mariadb_DATABASE=your_database_name
    PORT=8080


Reemplaza your_database_host, your_database_user, your_database_password, y your_database_name con los valores de tu propia base de datos.

## Create tu base de datos:

Tu base de datos sera creada con el nombre dependiendo del que proporciones en tu **dotenv**, en ~/Server$ ejecuta el siguiente comando:

    node ./src/db/initdb.js

Tus base de datos se crearan automaticamente en tu base de datos:

## Instalación de dependencias
Ejecuta el siguiente comando para instalar las dependencias del proyecto:

    npm install

 -multer 
 -morgan 
 -mariadb 
 -jsonwebtoken 
 -express 
 -dotenv 
 -cors 
 -bcrypt -
 body-parser


## Uso
Para iniciar la aplicación, ejecuta el siguiente comando:

        node --watch server.js

La API estará disponible en http://localhost:8080 (o el puerto que hayas configurado en las variables de entorno).

## Funcionalidades
Creación de tablas
Cuando la aplicación se inicia, se ejecuta automáticamente un script que crea las siguientes tablas en la base de datos:

Usuarios: Almacena información sobre usuarios, como nombre, apellidos y fecha de nacimiento.
Direcciones: Almacena información de direcciones, como país, ciudad y código postal.
Recomendaciones: Almacena recomendaciones relacionadas con usuarios y direcciones.
Comprobar el estado del servidor
Puedes verificar si el servidor está funcionando correctamente accediendo a la ruta raíz (/). La aplicación responderá con un mensaje JSON de prueba.

## Puntos de extensión
Esta aplicación es un punto de partida básico para construir una API más completa. Puedes extenderla agregando nuevas rutas, autenticación, validación de datos y otras funcionalidades según tus necesidades.

## Contribuciones
Si deseas contribuir a este proyecto, no dudes en abrir problemas o enviar solicitudes de extracción. Estamos encantados de recibir contribuciones y sugerencias.

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más detalles.

¡Espero que este README te sea útil para documentar tu aplicación! Si tienes alguna pregunta adicional o necesitas más información, no dudes en preguntar.

