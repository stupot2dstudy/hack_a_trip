


function Footer() {
    return (
        <footer className="bg-light py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Acerca de Nosotros</h5>
                        <p>
                            Ayudamos a los viajeros a encontrar los mejores destinos y planificar sus viajes.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h5>Enlaces Rápidos</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/">Inicio</a>
                            </li>
                            <li>
                                <a href="/explore">Explorar</a>
                            </li>
                            <li>
                                <a href="/destinations">Destinos</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Contacto</h5>
                        <p>
                            Email: travels@hackatrip.net
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
