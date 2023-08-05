import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NavBar({ lista }) {
  const listaDeseados = lista && (
    <li className="nav-item">
      <Link className="nav-link" to="/deseados">
        <i className="fa-regular fa-bookmark fs-2"></i>
      </Link>
    </li>
  );

  return (
    <nav
      className="navbar bg-dark navbar-expand-lg bg-body-tertiary mb-5 fixed-top"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Cellphora
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {listaDeseados}
            <li className="nav-item">
              {document.cookie ? (
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/cuenta"
                >
                  <i className="fa-solid fa-circle-user fa-bookmark fs-2"></i>
                </Link>
              ) : (
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  <i className="fa-solid fa-circle-user fa-bookmark fs-2"></i>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  lista: PropTypes.bool,
};

export default NavBar;
