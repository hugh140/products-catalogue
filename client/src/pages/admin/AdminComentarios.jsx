import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";

import useComentarios from "../../hooks/comentarios";
import ModalEliminarComment from "../../components/modals/ModalEliminarComment";

function AdminComentarios() {
  const { nombre } = useParams();
  const comentarios = useComentarios(nombre);

  return (
    <>
      <NavBar lista={Boolean(document.cookie)} />

      <main
        className="container"
        style={{ minHeight: "100vh", marginTop: "7rem" }}
      >
        <h1 className="display-4 text-center">Comentarios de {nombre}</h1>

        {comentarios?.length ? (comentarios?.map((producto) => (
          <div key={producto.idProducto}>
            <div  className="w-100 border mb-5 p-3">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-fill">
                  <Link to={`/producto/${producto.idProducto}`}>
                    <img
                      className="img-thumbnail"
                      src={producto.imgProducto}
                      width={100}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="ms-3 flex-grow-1 w-100">
                  <Link
                    to={`/producto/${producto.idProducto}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h3>{producto.nombreProducto}</h3>
                  </Link>
                </div>
                <div className="flex-shrink-1">
                  <button
                    className="btn btn-outline-dark me-4"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${producto.idProducto}`}
                  >
                    <i className="fa-solid fa-arrow-down"></i>Desplegar
                  </button>
                </div>
              </div>

              {producto.comentarios.map((comentario) => (
                <div
                  key={comentario.idComentario}
                  className="collapse"
                  id={`collapse${producto.idProducto}`}
                >
                  <div className="d-flex align-items-center mb-3 px-5">
                    <div className="ms-3 flex-grow-1 w-100">
                      <Link
                        to={`/producto/${comentario.idProducto}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <p>{comentario.textoComentario}</p>
                      </Link>
                    </div>
                    <div className="flex-shrink-1">
                      <button
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target={`#eliminarModal${comentario.idComentario}`}
                      >
                        <i
                          className="fa-solid fa-trash-can p-2"
                          style={{ color: "#ffffff" }}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <ModalEliminarComment
                    idComentario={comentario.idComentario}
                  />
                </div>
              ))}
            </div>
          </div>
        ))) : (
          <div className="text-center d-flex align-items-center justify-content-center">
            <div>
              <i
                className="fa-solid fa-circle-exclamation mb-3"
                style={{
                  color: "#0B67C8",
                  fontSize: "5rem",
                  marginTop: "5rem",
                }}
              ></i>
              <h1 style={{ color: "#4B4B4B" }}>
                No existen comentarios registrados de este usuario.
              </h1>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default AdminComentarios;
