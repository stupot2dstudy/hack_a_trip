// Importar las bibliotecas necesarias desde React y otros módulos
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Importar el componente principal de la aplicación
import { BrowserRouter } from 'react-router-dom'; // Proporciona la navegación de la aplicación
import { AuthProvider } from './contexts/AuthContext'; // Proporciona el contexto de autenticación
import { ErrorProvider } from './contexts/ErrorContext'; // Proporciona el contexto de manejo de errores (actualiza la ruta de importación)

import './index.css'



// Se crea un nodo de raíz de React en el elemento con el ID 'root' en el DOM
const root = createRoot(document.getElementById('root'));

// Se renderiza la aplicación React en el nodo raíz del DOM
root.render(
  <React.StrictMode>
    {/* Proporciona el contexto para manejar errores en la aplicación */}
    <ErrorProvider>
      {/* Proporciona el enrutamiento de la aplicación */}
      <BrowserRouter>
        {/* Proporciona el contexto para la autenticación de usuarios */}
        <AuthProvider>
          {/* Componente principal de la aplicación */}
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorProvider>
  </React.StrictMode>
);
