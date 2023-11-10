
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';


const RecommendationFooterCard = ({
    username,
    created_at
}) => {

    return (
        <Card.Footer className="recommendation-buttons">
            <p className="recommendation-username">Usuario: {username}</p>
            <p className="recommendation-created">{new Date(created_at).toLocaleDateString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
            })}</p>
        </Card.Footer>
    );
}

RecommendationFooterCard.propTypes = {

    username: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,

};

export default RecommendationFooterCard;
