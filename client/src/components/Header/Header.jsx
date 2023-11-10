
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { useAuth } from '../../hooks/useAuth';
import SearchBarForm from '../../forms/SearchBarForm/SearchBarForm'; // Import the SearchBarForm component
import './Header.css'


const headerStyles = {
    // Your existing styles
};

const Header = () => {
    const { authUser, authLogout } = useAuth();
    const navigate = useNavigate();

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to="/" className="navbar-brand" style={headerStyles.navbarBrand}>
                        <img src="/hackatrip.ico" alt="Hack a Trip" className="icon large-icon" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li>

                                <SearchBarForm />
                            </li>
                        </ul>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item">
                                <Link to="/explore" className="nav-link">
                                    Explorar
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/destinations" className="nav-link">
                                    Destinos
                                </Link>
                            </li>
                            {authUser ? (
                                <li>
                                    <Dropdown>
                                        <Dropdown.Toggle as={Link} className="nav-link">
                                            @{authUser.username}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to="/dashboard">
                                                Tu Perfil
                                            </Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/new-recommendation">
                                                Crear una Recomendación
                                            </Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/" onClick={authLogout}>
                                                Cerrar Sesión
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            ) : (
                                <li>
                                    <Link to="/login" className="nav-link">
                                        Mi Cuenta
                                    </Link>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
