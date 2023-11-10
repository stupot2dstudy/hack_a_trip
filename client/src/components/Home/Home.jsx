import React from 'react';
import './Home.css'

function Welcome() {
  return (
    <div className="container my-5 welcome-container" >
      <h1 className="display-4">¡Bienvenido a Hack a Trip!</h1> {/* Encabezado principal */}
      <p className="lead">
        Descubre destinos increíbles, planifica tus viajes y comparte tus experiencias con otros viajeros.
      </p> {/* Párrafo principal */}
      <a href="/explore" className="btn btn-primary btn-lg">Explorar</a> {/* Enlace para explorar */}
    </div >
  );
}

export default Welcome; // Exporta el componente Welcome como exportación predeterminada
