// SignOnPage.jsx


import { Navigate } from 'react-router-dom';
// Importa los hooks.
import { useAuth } from '../../hooks/useAuth';

// Importa los componentes.
import SignOnForm from '../../forms/SignOnForm/SignOnForm';



const SignOnPage = () => {
    // Utilizamos el hook useAuth para obtener información de autenticación.
    const { authUser, authLogin, loading } = useAuth();


    // Si el usuario ya está autenticado, redirige a /Dashboard.
    if (authUser) return <Navigate to="/Dashboard" />;


    return (
        <main>
            { /* Renderiza el formulario de inicio de sesión. */}
            <SignOnForm authLogin={authLogin} loading={loading} />
        </main>
    );
};

export default SignOnPage;
