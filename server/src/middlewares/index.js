const authUserController = require('./authUserController');
const authUserOptionalController = require('./authUserOptionalController');
const recomendacionExistsController = require('./recomendacionExistsController');
const checkIfUserLikedRecommendation = require('./checkIfUserLikedRecommendation')

module.exports = {
    authUserController,
    authUserOptionalController,
    recomendacionExistsController,
    checkIfUserLikedRecommendation,
};
