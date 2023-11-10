import React, { useState } from 'react';
import { Button, Form, InputGroup, Alert, Toast } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './RegisterForm.css';

const RegisterForm = ({ authRegister, loading }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [toastMessage, setToastMessage] = useState(''); // Toast message state
    const [showToast, setShowToast] = useState(false); // Toast visibility state


    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && email && password === repeatedPassword) {
            authRegister(username, email, password, repeatedPassword);
        } else {
            setToastMessage('Por favor, complete todos los campos obligatorios o asegúrese de que las contraseñas coincidan.');
            setShowToast(true);
        }
    };

    return (
        <div className="register-form-container">
            <h2>Registro</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Usuario:</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8} // Use curly braces for minLength
                        maxLength={100} // Use curly braces for maxLength
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Repetir contraseña:</Form.Label>
                    <Form.Control
                        type="password"
                        value={repeatedPassword}
                        onChange={(e) => setRepeatedPassword(e.target.value)}
                        minLength={8} // Use curly braces for minLength
                        maxLength={100} // Use curly braces for maxLength
                        required
                    />
                </Form.Group>

                <Button type="submit" disabled={loading}>
                    Registrarse
                </Button>
            </Form>
            <Toast show={showToast} onClose={() => setShowToast(false)}>
                <Toast.Header>
                    <strong className="mr-auto">Error</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </div>
    );
};

RegisterForm.propTypes = {
    authRegister: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default RegisterForm;
