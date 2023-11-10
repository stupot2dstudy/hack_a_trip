// RegisterPage.jsx

// Import the necessary hooks and components.

import { useAuth } from '../../hooks/useAuth'; // Importa los hooks necesarios.
import { Navigate } from 'react-router-dom'; // Importa Navigate para redirecciones.
import RegisterForm from '../../forms/RegisterForm/RegisterForm'; // Importa el formulario de registro.

import './RegisterPage.css'

const RegisterPage = () => {
    const { authUser, authRegister, loading } = useAuth(); // Obtiene el estado de autenticación y funciones relacionadas.

    // Si la persona ya está autenticada, redirigir a la página de éxito de registro.
    if (authUser) return <Navigate to="/registration-success" />;

    return (
        <div className='register-container'>

            <RegisterForm authRegister={authRegister} loading={loading} />

        </div>
    );
};

export default RegisterPage;
