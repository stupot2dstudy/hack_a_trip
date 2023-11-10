// Importamos dependencias
const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');

// Importamos constante

const { UPLOADS_DIR } = require('./constantesUtils');
const { deleteFileError } = require('../services/errorService');

const deletePhotoUtil = async (imgName, width) => {
    try {
        // Crear la ruta absoluta al archivo a eliminar
        const imgPath = path.join(__dirname, '..', '..', UPLOADS_DIR, imgName);

        try {
            // El metodo acces lanza un error si la ruta especificada no existe
            await fs.access(imgPath);
        } catch {
            // Si no existe entraremos finalizamosd la funcion
            return;
        }

        // Eliminamos la imagen
        await fs.unlink(imgPath);
    } catch (err) {
        console.error(err);
        deleteFileError;
    }
};

module.exports = deletePhotoUtil;
