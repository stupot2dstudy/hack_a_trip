// Importamos la función que retorna el token.
import { getToken } from '../utls/getToken';

// URL base del API.
const baseURL = import.meta.env.VITE_API_URL;

// Registro de usuario.
export const signUpService = async (username, email, password) => {
    const res = await fetch(`${baseURL}/users/register`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });

    const body = await res.json();

    return body;
};

// Login de usuario.
export const signInService = async (email, password) => {
    const res = await fetch(`${baseURL}/users/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const body = await res.json();

    return body;
};

// Obtener el perfil privado de un usuario.
export const getPrivateProfileService = async () => {
    const token = getToken();

    const res = await fetch(`${baseURL}/user`, {
        headers: {
            Authorization: token,
        },
    });

    const body = await res.json();

    return body;
};
