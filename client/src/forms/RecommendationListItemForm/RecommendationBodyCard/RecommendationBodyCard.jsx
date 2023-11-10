import { useState } from 'react';
import { Card, Row, Col, Toast, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { userPropTypes } from '../../../utls/customPropTypes';
import { handleUpvoteService } from '../../../services/recommendationService';
import { useError } from '../../../hooks/useError';

import './RecommendationBodyCard.css';

const RecommendationBodyCard = ({
    authUser,
    id,
    titulo,
    tipo,
    descripcion,
    likes,
    likedByMe,
    upvoteRecommendation
}) => {
    const { setErrMsg } = useError();
    const [loading, setLoading] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [successToastMessage, setSuccessToastMessage] = useState('');
    const [localLikes, setLocalLikes] = useState(likes);

    const handleLikeClick = async () => {
        try {
            setLoading(true);
            const method = likedByMe ? 'DELETE' : 'POST';
            const body = await handleUpvoteService(id, method);
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            setLocalLikes(likedByMe ? localLikes - 1 : localLikes + 1);
            upvoteRecommendation(id);
            setSuccessToastMessage('He añadido tu Me Gusta');
            setShowSuccessToast(true);
        } catch (err) {
            setErrMsg(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card.Body className="recommendation-card-body card-custom-body">
            <Card.Title className="recommendation-title">{titulo}</Card.Title>
            <Card.Text className="recommendation-descripcion">{descripcion}</Card.Text>
            <p className="recommendation-type">Tipo: {tipo}</p>
            <Row>
                <Col xs={12} sm={4}>
                    <Button
                        variant={likedByMe ? 'success' : 'primary'}
                        onClick={() => {
                            authUser && !loading && handleLikeClick();
                        }}
                    >
                        Me Gusta
                    </Button>
                </Col>
                <Col xs={6} sm={4}>
                    <div className="likes-text">{localLikes}</div>
                </Col>
                <Col xs={6} sm={4}>
                    <ToastContainer position="top-end">
                        <Toast
                            show={showSuccessToast}
                            onClose={() => setShowSuccessToast(false)}
                            autohide
                            delay={3000}
                            bg="success"
                            text="white"
                        >
                            <Toast.Body>{successToastMessage}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </Col>
            </Row>
        </Card.Body>
    );
};

RecommendationBodyCard.propTypes = {
    authUser: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
    likes: PropTypes.number.isRequired,
    likedByMe: PropTypes.bool.isRequired,
    upvoteRecommendation: PropTypes.func.isRequired,
};

export default RecommendationBodyCard;
