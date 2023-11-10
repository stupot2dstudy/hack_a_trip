// Importamos dependencias
const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');

// Importamos constante

const { UPLOADS_DIR } = require('./constantesUtils');
const { saveFileError } = require('../services/errorService');

const savePhotoUtil = async (img, width) => {
    try {
        // Crear la ruta absoluta al directorio de subida de archivos
        const uploadsPath = path.join(__dirname, '..', '..', UPLOADS_DIR);

        try {
            // El metodo acces lanza un error si la ruta especificada no existe
            await fs.access(uploadsPath);
        } catch {
            // Si no existe entraremos en este catch y crearemos el directorio.
            await fs.mkdir(uploadsPath);
        }

        // Convertimos la imagen a sharp para redimensionar.

        const sharpImg = sharp(img.data);

        //Redimensionamos la imagen
        sharpImg.resize(width);

        //Generamos un nombre unico para la imagen.
        const imgName = `${uuid.v4()}.jpg`;

        //Generamos la ruta absoluta de la imagen
        const imgPath = path.join(uploadsPath, imgName);

        //Guardamos la imagen
        await sharpImg.toFile(imgPath);

        // Retomamos el nombre que le hemos dado a la imagen
        return imgName;
    } catch (err) {
        console.error(err);
        saveFileError;
    }
};

module.exports = savePhotoUtil;
