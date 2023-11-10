// recommendationService.js

// Import the server configuration from 'config'
// Importa la configuración del id desde 'config'
const baseURL = import.meta.env.VITE_API_URL;

import { getToken } from '../utls/getToken'; // Fixed the import path
// Importa la función para obtener el token desde 'getToken' (Ruta fija)


// Registra una recomendación
export const createRecommendationService = async (formData) => {
    const token = getToken();

    const res = await fetch(`${baseURL}/recomendaciones`, { // Fixed the URL path
        method: 'POST', // Usa 'POST' en lugar de 'post'
        headers: {
            Authorization: token,
        },
        body: formData,
    });

    const body = await res.json();

    return body;
};


// Función para obtener recomendaciones
export const fetchRecommendationService = async (searchParams) => {
    const token = getToken();

    const res = await fetch(`${baseURL}/recomendaciones?${searchParams}`, {
        headers: token ? { Authorization: token } : {},
    });

    const body = await res.json();

    return body;
};

// Función para manejar un voto positivo (upvote)
export const handleUpvoteService = async (recomendacionId, method) => {
    const token = getToken();

    const res = await fetch(`${baseURL}/recomendaciones/${recomendacionId}/likes`, { // Fixed the URL path
        method,
        headers: {
            Authorization: token,
        },
    });

    const body = await res.json();

    return body;
};

// Función para manejar un voto negativo (downvote)
export const handleDownvoteService = async (recomendacionId) => {
    const token = getToken();

    const res = await fetch(`${baseURL}/recomendaciones/${recomendacionId}/likes`, { // Fixed the URL path and 'delete' method
        method: 'DELETE', // Usa 'DELETE' para eliminar una recomendación
        headers: {
            Authorization: token,
        },
    });

    const body = await res.json();

    return body;
};


// Elimina una recomendación.
export const deleteRecommendationService = async (recomendacionId) => {
    const token = getToken();

    const res = await fetch(`${baseURL}/recomendaciones/${recomendacionId}`, { // Fixed the URL path and 'DELETE' method
        method: 'DELETE',
        headers: {
            Authorization: token,
        },
    });

    const body = await res.json();

    return body;
};
