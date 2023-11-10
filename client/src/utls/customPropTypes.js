import PropTypes from 'prop-types';

// PropTypes para un objeto de publicación
export const recomendacionPropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,     // ID único
    titulo: PropTypes.string.isRequired,
    tipo: PropTypes.number.isRequired,
    foto: PropTypes.string,
    descripcion: PropTypes.string,
    usuarioId: PropTypes.number.isRequired, // Nombre de usuario del autor
    owner: PropTypes.bool.isRequired,    // ¿Es el usuario actual el propietario del tweet?
    likedByMe: PropTypes.bool.isRequired, // ¿El usuario actual está entre los que han dado "me gusta"?
    likes: PropTypes.number.isRequired,  // Número de "me gusta"
    username: PropTypes.string.isRequired, // ID del usuario que publicó el tweet
    created_at: PropTypes.string.isRequired, // Marca de tiempo de creación
});

// PropTypes para un objeto de usuario
export const userPropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,     // ID de usuario único
    email: PropTypes.string.isRequired,  // Correo electrónico del usuario
    username: PropTypes.string.isRequired, // Nombre de usuario del usuario
    avatar: PropTypes.string,            // URL de la imagen de avatar del usuario (opcional)   // Rol del usuario (p. ej., "admin" o "usuario")
    // Marca de tiempo de creación del usuario
});
