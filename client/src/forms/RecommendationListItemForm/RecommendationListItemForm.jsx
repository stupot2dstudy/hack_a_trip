import React, { useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useRecommendation } from '../../hooks/useRecommendation';

import RecommendationHeaderCard from './RecommendationHeaderCard/RecommendationHeaderCard';
import RecommendationBodyCard from './RecommendationBodyCard/RecommendationBodyCard';
import RecommendationFooterCard from './RecommendationFooterCard/RecommendationFooterCard';

import 'react-toastify/dist/ReactToastify.css'; // Import the styles

import PropTypes from 'prop-types';
import { userPropTypes, recomendacionPropTypes } from '../../utls/customPropTypes';



import './RecommendationListItemForm.css';

function RecommendationListItemForm(recomendacion) {
    const { upvoteRecommendation, loading } = useRecommendation();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const authUser = true;

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };




    return (
        <Card className={`recommendation-card card-custom mx-auto ${isFullScreen ? 'full-screen' : ''}`} style={{ maxWidth: '40vw' }}>
            {/* Display the toast container */}
            <ToastContainer />

            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Hack a Trip...</span>
                </Spinner>
            ) : (
                <>
                    <div onClick={toggleFullScreen}>
                        <RecommendationHeaderCard

                            id={recomendacion.id}
                            foto={recomendacion.foto}
                        />
                    </div>
                    <div onClick={toggleFullScreen}>
                        <RecommendationBodyCard
                            id={recomendacion.id}
                            authUser={authUser}
                            titulo={recomendacion.titulo}
                            tipo={recomendacion.tipo}
                            descripcion={recomendacion.descripcion}
                            likes={recomendacion.likes}
                            likedByMe={recomendacion.likedByMe}
                            upvoteRecommendation={upvoteRecommendation}

                        />
                    </div>
                    <div onClick={toggleFullScreen}>
                        <RecommendationFooterCard
                            username={recomendacion.username} // Pass the username prop
                            created_at={recomendacion.created_at}

                        />
                    </div>
                </>
            )}
        </Card>
    );
}

RecommendationListItemForm.propTypes = {
    authUser: userPropTypes,

    recomendacion: recomendacionPropTypes,

    upvoteRecommendation: PropTypes.func.isRequired,


};

export default RecommendationListItemForm;
