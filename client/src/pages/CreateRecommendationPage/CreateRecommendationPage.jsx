import React, { useState } from 'react';
import CreateRecommendationForm from '../../forms/CreateRecommendationForm/CreateRecommendationForm';
import { Button, Toast } from 'react-bootstrap'; // Import the Toast component

import './CreateRecommendationPage.css'; // Make sure to include your CSS file

function CreateRecommendationPage() {
    // Step 2: Define state variables for the notification
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Step 3: Function to show the notification
    const showNotification = (message) => {
        setToastMessage(message);
        setShowToast(true);

        // Auto-hide the notification after a delay (e.g., 3 seconds)
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    return (
        <div className="container container-create">
            <h2 className="text-center-create">Crear Recomendación</h2>
            <CreateRecommendationForm showNotification={showNotification} /> {/* Pass the function as a prop */}

            {/* Step 4: Render the Toast conditionally */}
            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                }}
            >
                <Toast.Header closeButton={false}>
                    <strong>Notificación</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </div>
    );
}

export default CreateRecommendationPage;
