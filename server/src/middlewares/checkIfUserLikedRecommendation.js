const selectAllRecomendacionModel = require('../models/recomendaciones/selectAllRecomendacionModel');

// Function to check if a user has liked a recommendation
const checkIfUserLikedRecommendation = async (recomendacionId, userId) => {
    try {
        // Assuming you have a database where likes are stored
        // You may need to replace this with actual database queries
        // Check if there is a record in the "likes" table where userId and recomendacionId match
        // If such a record exists, return true, indicating that the user has already liked the recommendation
        // If no such record exists, return false
        const likeRecord = await selectAllRecomendacionModel(recomendacionId, userId);

        return likeRecord ? true : false;
    } catch (error) {
        throw error;
    }
};

module.exports = checkIfUserLikedRecommendation;
