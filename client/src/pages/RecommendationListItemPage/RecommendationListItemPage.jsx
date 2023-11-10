import React from 'react';
import { Spinner, Alert, Button, Row, Col } from 'react-bootstrap';

import { useRecommendation } from '../../hooks/useRecommendation';
import { handleUpvoteService } from '../../services/recommendationService'; // Corrected the import statement
import { useAuth } from '../../hooks/useAuth';

import RecommendationListItemForm from '../../forms/RecommendationListItemForm/RecommendationListItemForm';


const RecommendationListItemPage = () => {
    const { authUser } = useAuth();
    const {
        recomendaciones,
        loading,
        error,
        handleOrderByLikes,
        sortRecommendations,
        handleOrderByDate,
        sortingBy,
        setSortingBy,
        setAscOrder,
        ascOrder,
        upvoteRecommendation,

    } = useRecommendation();

    return (
        <div className="container">
            <h2 className="text-center mt-3">Recomendaciones</h2>
            <Row className="d-flex align-items-center justify-content-center">
                <Col xs={5} sm={6} md={6} lg={6} className="my-5">
                    <div className="order-bar">
                        <label htmlFor="orderBySelect" className="me-2">
                            Ordenar por:
                        </label>
                        <select
                            id="orderBySelect"
                            className="form-select col-0"
                            value={sortingBy}
                            onChange={(e) => {
                                setSortingBy(e.target.value);
                            }}
                        >
                            <option value="likes">Likes</option>
                            <option value="created_at">Fecha</option>
                        </select>
                        <Button
                            variant="info"
                            size="sm"
                            className="btn-rectangular"
                            onClick={() => {
                                if (sortingBy === 'likes') {
                                    handleOrderByLikes();
                                } else if (sortingBy === 'created_at') {
                                    handleOrderByDate();
                                }
                                setAscOrder(!ascOrder);
                            }}
                        >
                            {ascOrder ? 'Ordenar Ascendente' : 'Ordenar Descendente'}
                        </Button>
                    </div>
                </Col>
            </Row>

            {loading ? (
                <Spinner animation="border" role="status" className="d-block m-auto my-3">
                    <span className="sr-only">Cargando...</span>
                </Spinner>
            ) : error ? (
                <Alert variant="danger" className="text-center my-3">
                    {error.message}
                </Alert>
            ) : recomendaciones?.length > 0 ? (
                <div className="recommendation-list">
                    {sortRecommendations(recomendaciones).map((recomendacion) => (
                        <RecommendationListItemForm
                            key={recomendacion.id}
                            authUser={authUser}
                            recommendation={recomendacion}
                            upvoteRecommendation={() => upvoteRecommendation(recomendacion.id)}

                            id={recomendacion.id}
                            foto={recomendacion.foto}
                            titulo={recomendacion.titulo}
                            descripcion={recomendacion.descripcion}
                            tipo={recomendacion.tipo}
                            likes={recomendacion.likes}
                            likedByMe={recomendacion.likedByMe}
                            recommendationId={recomendacion.id}
                            username={recomendacion.username}
                            created_at={recomendacion.created_at}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center my-3">No se encontraron recomendaciones.</p>
            )}
        </div>
    );
}

export default RecommendationListItemPage;
