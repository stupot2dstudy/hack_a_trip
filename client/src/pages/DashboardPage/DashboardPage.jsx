import React, { useEffect, useState } from 'react';

import DashboardForm from '../../forms/DashboardForm/DashboardForm';

// Importa los hooks y funciones necesarios
import { useAuth } from '../../hooks/useAuth';

const DashboardPage = () => {
    const { authUser, loading } = useAuth(); // Utiliza el hook 'useAuth' para obtener el usuario autenticado y el estado de carga

    // Asegura que 'userData' sea un objeto o un objeto vacío
    const userData = authUser || {};

    return (
        <main>
            <DashboardForm userData={userData} loading={loading} />
        </main>
    );
}

export default DashboardPage;
