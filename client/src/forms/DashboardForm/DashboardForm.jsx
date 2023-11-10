import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { getToken } from '../../utls/getToken';
import { useError } from '../../hooks/useError';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseURL = import.meta.env.VITE_API_URL;

const DashboardForm = ({ userData, loading }) => {
    const [avatarFile, setAvatarFile] = useState(null);
    const [updatingAvatar, setUpdatingAvatar] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const { setError } = useError();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
        }
    };

    const handleUpdateAvatar = () => {
        if (avatarFile) {
            setShowConfirmation(true);
        } else {
            // Show a toast notification if no avatar is selected
            toast.error('Por favor, seleccione un archivo de avatar.');
        }
    };

    const handleConfirm = () => {
        const token = getToken();
        if (avatarFile) {
            setUpdatingAvatar(true);
            const formData = new FormData();
            formData.append('avatar', avatarFile, avatarFile.name);
            fetch(`${baseURL}/user`, {
                method: 'PUT',
                headers: {
                    Authorization: token,
                },
                body: formData,
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('Avatar actualizado exitosamente');
                        // Show a success toast notification
                        toast.success('Avatar actualizado exitosamente');
                    } else {
                        setError('Fallo al actualizar el avatar');
                    }
                })
                .catch((error) => {
                    console.error('Error de red:', error);
                    setError('Error de red');
                })
                .finally(() => {
                    setUpdatingAvatar(false);
                    setShowConfirmation(false);
                });
        }
    };

    return (
        <div>
            <h1 className="text-center mb-4">Bienvenido {userData.username}</h1>
            {userData ? (
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img
                                src={avatarFile
                                    ? URL.createObjectURL(avatarFile)
                                    : `${baseURL}/${userData.avatar || 'image.jpeg'}`}
                                className="img-fluid rounded-start"
                                alt="User Avatar"
                                style={{ maxWidth: '10vw' }}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="form-control mt-2"
                            />
                            <button
                                onClick={handleUpdateAvatar}
                                className="btn btn-primary mt-2"
                                disabled={updatingAvatar}
                            >
                                {updatingAvatar ? 'Updating Avatar...' : 'Actualiza tu Avatar'}
                            </button>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Information de Usuario</h5>
                                <p className="card-text">
                                    <strong>ID:</strong> {userData.id || 'N/A'}
                                </p>
                                <p className="card-text">
                                    <strong>Username:</strong> {userData.username || 'N/A'}
                                </p>
                                <p className="card-text">
                                    <strong>Email:</strong> {userData.email || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading user data...</p>
            )}

            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmacion de actualizacion de Avatar</Modal.Title>
                </Modal.Header>
                <Modal.Body>Estas seguro que deseas actualizar tu Avatar?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => { setShowConfirmation(false); handleConfirm(); }}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add ToastContainer here to show toast notifications */}
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

DashboardForm.propTypes = {
    userData: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        email: PropTypes.string,
        avatar: PropTypes.string,
    }),
    loading: PropTypes.bool.isRequired,
};

export default DashboardForm;
