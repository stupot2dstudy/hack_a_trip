const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras intermedias
const authUserController = require('../middlewares/authUserController');
const recomendacionExistsController = require('../middlewares/recomendacionExistsController');

// const authUserOptionalController = require('../middlewares/authUserOptionalController')

// Importamos las funciones controladoras finales.
const {
    crearRecomendacionController,
    insertLikeController,
    deleteLikeController,
    listRecomendacionController,
    // deleteRecomendacionController,
    //selectRecomendacionByIdController,

} = require('../controllers/recomendaciones');

//Insertar una recomendacion
router.post(
    '/recomendaciones',
    authUserController,
    crearRecomendacionController
);

router.post('/recomendaciones/:recomendacionId/likes',
    recomendacionExistsController,
    authUserController,
    insertLikeController
);

//Eliminar un like
router.delete(
    '/recomendaciones/:recomendacionId/likes',
    authUserController,
    deleteLikeController
);

// Seleccionar todas las recomendaciones
router.get('/recomendaciones', listRecomendacionController);
//router.get('/recomendaciones/:recomendacionId', selectRecomendacionByIdController);

// // Eliminar una recomendacion
// router.delete(
//     '/recomendacion/:recomendacionId',
//     authUserController,
//     deleteRecomendacionController
// );

module.exports = router;
