import { useError } from './hooks/useError';


import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Welcome from './components/Home/Home';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';


// import para usuarios
import RegisterPage from './pages/RegisterPage/RegisterPage';
import SignOnPage from './pages/SignOnPage/SignOnPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import RegistrationSuccess from './pages/RegisterPage/RegistrationSuccess';

import CreateRecommendationPage from './pages/CreateRecommendationPage/CreateRecommendationPage'
import CreatedRecommendationSuccessfullyForm from './forms/CreateRecommendationForm/CreatedRecommendationSuccessfullyForm'
// import para recomendaciones
import RecommendationListItemPage from './pages/RecommendationListItemPage/RecommendationListItemPage';



import NotFound from './pages/NotFoundPage/NotFound';

const App = () => {
  const { errMsg, setErrMsg } = useError();

  return (
    <div className='app'>

      {/* Encabezado de la aplicación */}

      <Header />
      <ErrorMessage errMsg={errMsg} setErrMsg={setErrMsg} />
      <Routes>
        {/* Rutas de la aplicación */}
        <Route path="/" element={<Welcome />} />
        {/* Ruta para la página de inicio */}
        <Route path="/login" element={<SignOnPage />} />
        {/* Ruta para la página de inicio de sesión */}
        <Route path="/register" element={<RegisterPage />} />
        {/* Ruta para la página de registro */}
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        {/* Ruta para la página de éxito de registro */}
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Ruta para la página del panel de control */}
        <Route path="/explore" element={<RecommendationListItemPage authUser />} />
        {/* Ruta para explorar contenido recomendado */}
        <Route path="/new-recommendation" element={<CreateRecommendationPage />} />

        <Route path="/new-recommendation-successfully-created" element={<CreatedRecommendationSuccessfullyForm />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      {/* Pie de página de la aplicación */}
    </div>
  );
}

export default App;
