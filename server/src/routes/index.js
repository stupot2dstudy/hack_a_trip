const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const recomendacionRoutes = require('./recomendacionRoutes');

//Middleware que indica donde se encuentran las rutas
router.use(userRoutes);
router.use(recomendacionRoutes);

module.exports = router;
