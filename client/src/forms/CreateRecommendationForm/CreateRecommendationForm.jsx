import React, { useState, useRef } from 'react';
import { Form, Button, InputGroup, Modal, Toast, ToastContainer } from 'react-bootstrap'; // Import Toast


import { useNavigate } from 'react-router-dom';
import { useError } from '../../hooks/useError';
import { useRecommendation } from '../../hooks/useRecommendation';
import { handleAddFilePreview } from '../../utls/handleAddFilePreview';
import { handleRemoveFilePreview } from '../../utls/handleRemoveFilePreview';


import './CreateRecommendationForm.css';

const RecommendationCreateForm = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const { setErrMsg } = useError();
    const { handleRecommendationCreate } = useRecommendation();

    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('1');
    const [descripcion, setDescripcion] = useState('');
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [successToastMessage, setSuccessToastMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any required field is missing
        if (!titulo || !tipo || !descripcion) {
            setErrMsg('Por favor, complete todos los campos obligatorios.');
        } else {
            setShowConfirmation(true);
        }
    };

    const handleConfirm = async () => {
        setConfirmed(true);
        try {
            await handleRecommendationCreate(titulo, tipo, descripcion, file);

            // Set the success message and show the success notification
            setSuccessToastMessage('Recomendación creada con éxito');
            setShowSuccessToast(true);
        } catch (err) {
            setErrMsg(err.message);
        }
    };

    return (
        <Form className="recommendation-create-form">

            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                >
                    <option value="1">Gastronómico</option>
                    <option value="2">Museos</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    maxLength="280"
                    required
                />
            </Form.Group>
            <div className="img-prev-container">
                <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Enviar
                </Button>
                <InputGroup>
                    <Form.Control
                        type="file"
                        id="file-input"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) =>
                            handleAddFilePreview(e, setFile, setPreviewUrl)
                        }
                    />
                    <InputGroup.Text>Seleccionar archivo</InputGroup.Text>
                </InputGroup>
                {previewUrl && (
                    <div className="image-preview">
                        <img
                            src={previewUrl}
                            alt="Previsualización"
                            title="Eliminar imagen"
                            onClick={() => {
                                handleRemoveFilePreview(
                                    fileInputRef,
                                    setFile,
                                    setPreviewUrl
                                );
                            }}
                        />
                    </div>
                )}
            </div>

            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación de Creación de Recomendación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que deseas crear esta recomendación?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => { setShowConfirmation(false); handleConfirm(); }}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-end">
                <Toast
                    show={showSuccessToast}
                    onClose={() => setShowSuccessToast(false)}
                    autohide
                    delay={3000} // Duration to show the notification
                    bg="success"
                    text="white"
                >
                    <Toast.Body>{successToastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Form>

    );
};

export default RecommendationCreateForm;