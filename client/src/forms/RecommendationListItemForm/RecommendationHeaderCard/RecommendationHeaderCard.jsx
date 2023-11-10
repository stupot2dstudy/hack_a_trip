import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const baseURL = import.meta.env.VITE_API_URL;

function RecommendationHeaderCard({ id, foto }) {
    return (
        <Card.Header>
            <p className="recommendation-id">Recomendacion ID: {id}</p>
            <Card.Img
                variant="top"
                src={foto ? `${baseURL}/${foto}` : 'view.jpg'}
                className="recommendation-image"
                alt="View"
            />
        </Card.Header>
    );
}

RecommendationHeaderCard.propTypes = {
    id: PropTypes.number.isRequired,
    foto: PropTypes.string,
};

export default RecommendationHeaderCard;
