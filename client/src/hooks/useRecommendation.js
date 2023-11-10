import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    fetchRecommendationService,
    createRecommendationService,
    handleUpvoteService,
    deleteRecommendationService,

} from '../services/recommendationService'; // Corrected the import path
import { useError } from './useError';

export const useRecommendation = () => {
    const { setErrMsg } = useError();

    const [recomendaciones, setRecomendaciones] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);


    const [sortingBy, setSortingBy] = useState('created_at');
    const [ascOrder, setAscOrder] = useState(false); // Initialize to descending order
    const [sortByLikes, setSortByLikes] = useState(false);

    const [error, setError] = useState(null);


    const navigate = useNavigate();



    const handleOrderByLikes = () => {
        setSortingBy('likes');
        setSortByLikes(!sortByLikes);
        setAscOrder(sortByLikes);
    };

    const handleOrderByDate = () => {
        setSortingBy('created_at');
        setSortByLikes(false);
        setAscOrder(true);
    };

    const sortRecommendations = (recomendacionesToSort) => {
        return recomendacionesToSort.slice().sort((a, b) => {
            if (sortingBy === 'likes') {
                return ascOrder ? a.likes - b.likes : b.likes - a.likes;
            } else if (sortingBy === 'created_at') {
                return ascOrder
                    ? new Date(a.created_at) - new Date(b.created_at)
                    : new Date(b.created_at) - new Date(a.created_at);
            }
            return 0;
        });
    };

    useEffect(() => {
        const fetchRecommendationsData = async () => {
            try {
                setLoading(true);
                const body = await fetchRecommendationService(searchParams);
                console.log('API Response:', body);

                setRecomendaciones(body.data.recomendaciones);
            } catch (err) {
                setErrMsg(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendationsData();
    }, [searchParams, setErrMsg]);

    const upvoteRecommendation = async (recomendacionId) => {
        try {
            const response = await handleUpvoteService(recomendacionId);
            if (response.success) {
                const updatedRecomendaciones = recomendaciones.map((recomendacion) => {
                    if (recomendacion.id === recomendacionId) {
                        const likedByMe = !recomendacion.likedByMe;
                        const likes = likedByMe ? recomendacion.likes + 1 : recomendacion.likes - 1;

                        return {
                            ...recomendacion,
                            likedByMe,
                            likes
                        };
                    }

                    return recomendacion;
                });
                setRecomendaciones(updatedRecomendaciones);
            } else {
                setError(new Error(response.message));
            }
        } catch (error) {
            setError(error);
        }
    };


    const deleteRecommendationsById = (recomendacionId) => {

        const newRecomendaciones = recomendaciones.filter(
            (recomendacion) => recomendacion.id !== recomendacionId
        );
        setRecomendaciones(newRecomendaciones);
    };

    const handleRecommendationCreate = async (titulo, tipo, descripcion, file) => {
        try {
            setLoading(true);
            const formData = new FormData();

            if (titulo.trim() === '' || tipo.trim() === '') {
                throw new Error('Los campos Título y Tipo son obligatorios.');
            }

            formData.append('titulo', titulo);
            formData.append('tipo', tipo);

            if (descripcion.trim() !== '') {
                formData.append('descripcion', descripcion);
            }

            if (file) formData.append('foto', file);

            const body = await createRecommendationService(formData);

            if (body.status === 'error') {
                throw new Error(body.message);
            }

            navigate('/new-recommendation-successfully-created');
        } catch (err) {
            setErrMsg(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        recomendaciones,
        loading,
        setSearchParams,
        upvoteRecommendation,
        deleteRecommendationsById,
        error,
        handleOrderByLikes,
        sortRecommendations,
        ascOrder,

        handleRecommendationCreate,
        handleOrderByDate,
        sortingBy,
        setSortingBy,
        setAscOrder,
    };
};