// RegistrationSuccess.jsx

// Import Link para crear enlaces en la aplicación.
import { Link } from 'react-router-dom'; // Importa Link

const RegistrationSuccess = () => {
    return (
        <div className="container my-5">
            <h1 className="display-4">Registro Exitoso</h1>
            <p>
                Te has registrado con éxito. Ahora puedes{' '}
                <Link to="/login">iniciar sesión</Link> ¡ya!
            </p>
        </div>
    );
};

export default RegistrationSuccess;
