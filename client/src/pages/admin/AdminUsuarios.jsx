import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

import useUsuarios from "../../hooks/usuarios";
import ModalEliminarUsuario from "../../components/modals/ModalEliminarUsuario";

function AdminUsuarios() {
  const usuarios = useUsuarios();

  return (
    <>
      <NavBar lista={Boolean(document.cookie)} />

      <main
        className="container"
        style={{ minHeight: "100vh", marginTop: "7rem" }}
      >
        <h1 className="display-4 text-center">Lista de Usuarios</h1>

        {usuarios?.map((usuario) => (
          <div key={usuario.idUsuario}>
            <div className="w-100">
              <hr />
              <div className="d-flex align-items-center mb-3">
                <div className="ms-3 flex-grow-1 w-100">
                  <h3>{usuario.nombreUsuario}</h3>
                  <p>{usuario.emailUsuario}</p>
                </div>
                <div className="flex-shrink-1">
                  <div className="d-flex flex-column mb-3">
                    <Link
                      to={`/admin/usuarios/${usuario.nombreUsuario}`}
                      className="btn btn-primary mb-2"
                    >
                      <i
                        className="fa-regular fa-comment p-2"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </Link>
                    <button
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target={`#eliminarModal${usuario.idUsuario}`}
                    >
                      <i
                        className="fa-solid fa-trash-can p-2"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
              <hr />
            </div>

            <ModalEliminarUsuario idUsuario={usuario.idUsuario} />
          </div>
        ))}
      </main>

      <Footer />
    </>
  );
}
export default AdminUsuarios;
