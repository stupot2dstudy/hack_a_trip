// Importamos las dependencias.
const joi = require('joi');

// Importamos el objeto con los mensajes de error personalizados.
const joiErrorMessages = require('../joiErrorMessages');

// Importamos el esquema de la imagen.
const imgSchema = require('../imgSchema');

// Creamos el esquema de validación.
const newRecomendacionSchema = joi.object({
    titulo: joi.string().required().messages(joiErrorMessages),
    tipo: joi.string().required().messages(joiErrorMessages),
    descripcion: joi.string().optional().messages(joiErrorMessages),
    foto: imgSchema.optional().messages(joiErrorMessages),
});

module.exports = newRecomendacionSchema;
