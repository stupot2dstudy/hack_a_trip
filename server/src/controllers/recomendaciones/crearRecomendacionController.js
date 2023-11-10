const crearRecomendacionModel = require('../../models/recomendaciones/crearRecomendacionModel');
const savePhotoUtil = require('../../utils/savePhotoUtil');
const validateSchema = require('../../utils/validateSchema');

const newRecomendacionSchema = require('../../schemas/recomendaciones/newRecomendacionSchema')

//Importamos errores


const crearRecomendacionController = async (req, res, next) => {
    // Almacenamos haciendo destructuring de los campos
    try {
        const { titulo, tipo, descripcion } = req.body;

        await validateSchema(newRecomendacionSchema, {
            ...req.body,
            ...req.files,
        });

        // Variable que almacena imagen
        let imgName;

        // Si existe imagen, la guardamos en disco y obtenemos nombre.
        if (req.files?.foto) {
            imgName = await savePhotoUtil(req.files.foto, 500);
        }

        // Creamos la recomendación en BBDD and obtain its ID
        const recomendacionId = await crearRecomendacionModel(
            titulo,
            tipo,
            imgName,
            descripcion,
            req.user.id
        );

        res.send({
            status: 'ok',
            data: {
                recomendacion: {
                    id: Number(recomendacionId), // Convert BigInt to number
                    usuarioId: req.user.id,
                    titulo,
                    tipo,
                    foto: imgName || null,
                    descripcion,
                    createAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = crearRecomendacionController;
