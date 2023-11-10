// Importamos los prop-types.
import PropTypes from 'prop-types';

// Importamos la función que crea un contexto y los hooks.
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useError } from '../hooks/useError';

// Importamos los servicios.
import {
    getPrivateProfileService,
    signInService,
    signUpService,
} from '../services/userService';

// Importamos las constantes.
import { TOKEN_LOCAL_STORAGE_KEY } from '../utls/constants';

// Importamos la función que retorna el token.
import { getToken } from '../utls/getToken';



// Creamos el contexto de autenticación.
// Creamos el contexto de autenticación.
export const AuthContext = createContext(null);

// Creamos el componente provider del contexto.
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const { setErrMsg } = useError();

    const [authUser, setAuthUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Función que retorna los datos del usuario.
        const fetchUser = async () => {
            try {
                setLoading(true);

                const body = await getPrivateProfileService();

                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                setAuthUser(body.data);
            } catch (err) {
                setErrMsg(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Obtenemos el token.
        const token = getToken();

        // Si existe token solicitamos los datos del usuario.
        if (token) fetchUser();
    }, [isAuthenticated, setErrMsg]);

    // Función que registra a un usuario en la base de datos.
    const authRegister = async (
        username,
        email,
        password,
        repeatedPassword
    ) => {
        try {
            setLoading(true);

            if (password !== repeatedPassword) {
                throw new Error('Las contraseñas no coinciden');
            }

            const body = await signUpService(username, email, password);

            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Una vez registrados redirigimos a la página de login.
            navigate('/registration-success');
        } catch (err) {
            setErrMsg(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Función que logea a un usuario retornando un token.
    // Modify the authLogin function to handle errors and set the error state.
    const authLogin = async (email, password) => {
        try {
            setLoading(true);

            const body = await signInService(email, password);

            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Almacenamos el token en el localStorage. Dado que la variable "token" es un string no es
            // necesario aplicar el JSON.stringify.
            localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, body.data.token);

            // Indicamos que el usuario se ha logeado.
            setIsAuthenticated(true);
            navigate('/Dashboard');
        } catch (err) {
            // Set the error state to the error message.
            setErrMsg(err.message);
        } finally {
            setLoading(false);
        }
    };


    // Función de logout.
    const authLogout = () => {
        // Eliminamos el token del localStorage.
        localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);

        // Eliminamos los datos del usuario y establecemos isAuthenticated a false.
        setAuthUser(null);

        setIsAuthenticated(false);

    };

    return (
        <AuthContext.Provider
            value={{
                authUser,
                authRegister,
                authLogin,
                authLogout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
