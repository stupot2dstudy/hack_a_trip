import React from 'react';
import { Link } from 'react-router-dom';

import './CreatedRecommendationSuccessfullyForm.css'
const CreatedRecommendationSuccessfullyForm = () => {
    return (
        <div className="centered-form-container">
            <div className="success-message">
                <h2>Recomendación creada con éxito</h2>
                <p>¡Tu recomendación se ha enviado correctamente!</p>
                <Link to="/explore">Ir a Explorar</Link>
            </div>
        </div>
    );
};

export default CreatedRecommendationSuccessfullyForm;
