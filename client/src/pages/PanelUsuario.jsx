import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import useUsuario from "../hooks/usuario";
import { Link } from "react-router-dom";

import ModalEditarUsuario from "../components/modals/ModalEditarUsuario";

function PanelUsuario() {
  const usuario = useUsuario();

  function logOut() {
    document.cookie =
      "PFToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/";
  }

  return (
    <>
      <NavBar lista={Boolean(document.cookie)} />

      <main
        className="container mx-auto w-75"
        style={{ height: "100vh", marginTop: "7rem" }}
      >
        <h1 className="display-4 text-center">Tu Cuenta</h1>

        <div className="border p-4 position-relative">
          <button
            className="btn btn-outline-dark position-absolute top-0 end-0"
            data-bs-toggle="modal"
            data-bs-target="#editarModal"
          >
            <i className="fa-solid fa-pen-to-square p-2"></i>
          </button>
          <h1>Información:</h1>
          <table>
            <tbody>
              <tr>
                <td>
                  <p>
                    <strong>Nombre de Usuario:</strong>
                  </p>
                </td>
                <td>
                  <p className="ps-3">{usuario?.nombreUsuario}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    <strong>Correo:</strong>
                  </p>
                </td>
                <td>
                  <p className="ps-3">{usuario?.emailUsuario}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="row text-center">
          <div className="col-md-6">
            <h3 className="mt-5 mb-4">Panel de Usuario:</h3>
            <Link
              to="/deseados"
              type="button"
              className="btn btn-outline-dark w-100"
            >
              Lista de Deseados
            </Link>
            <br />
            <br />
            <button
              type="button"
              className="btn btn-dark w-100"
              onClick={logOut}
            >
              Cerrar Sesión
            </button>
          </div>
          {usuario?.permisoUsuario === "admin" && (
            <div className="col-md-6">
              <h3 className="mt-5 mb-4">Panel de Administrador:</h3>

              <Link type="button" className="btn btn-outline-dark w-100">
                Administrar Productos
              </Link>
              <br />
              <br />
              <Link
                to="/deseados"
                type="button"
                className="btn btn-outline-dark w-100"
              >
                Administrar Usuarios
              </Link>
            </div>
          )}
        </div>
      </main>

      <ModalEditarUsuario nombreUsuario={usuario?.nombreUsuario} />

      <Footer />
    </>
  );
}

export default PanelUsuario;
