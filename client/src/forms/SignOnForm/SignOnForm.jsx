import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SignOnForm = ({ authLogin, loading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        // Perform your authentication logic here, e.g., calling an API
        try {
            // Simulate an authentication success
            const response = await authLogin(email, password);

            // Handle authentication success or failure here

        } catch (error) {
            // Handle authentication error here
        }
    };

    return (
        <div style={{ width: '20vw', marginBottom: '1vw' }}>
            <div className="container my-5">
                <h1 className="display-4">Iniciar Sesión en Tu Cuenta</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Correo Electrónico:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength="8"
                            maxLength="100"
                            required
                        />
                    </div>
                    <button
                        disabled={loading}
                        className="btn btn-primary"
                    >
                        Iniciar Sesión
                    </button>
                    <p className="mt-3">¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
                </form>
            </div>
        </div>
    );
};

SignOnForm.propTypes = {
    authLogin: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default SignOnForm;
