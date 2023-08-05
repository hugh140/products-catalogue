import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import useListaDeseados from "../hooks/listaDeseados";

function ListaDeseos() {
  const listaDeseados = useListaDeseados();

  function eliminarDeseo(id) {
    fetch(`http://localhost:3000/lista?id=${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.ok)
          throw new Error(
            "Ha ocurrido un error al borrar este producto de tu lista."
          );
        window.location.reload();
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <NavBar lista={Boolean(document.cookie)} />

      <main
        className="container"
        style={{ height: "100vh", marginTop: "7rem" }}
      >
        <h1 className="display-4 text-center">Lista de Deseados</h1>

        {listaDeseados?.length ? (
          listaDeseados?.map((deseado) => (
            <div key={deseado.idProducto} className="w-100">
              <hr />
              <div className="d-flex align-items-center mb-3">
                <div className="flex-fill">
                  <Link to={`/producto/${deseado.idProducto}`}>
                    <img
                      className="img-thumbnail"
                      src={deseado.imgProducto}
                      width={100}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="ms-3 flex-grow-1 w-100">
                  <Link
                    to={`/producto/${deseado.idProducto}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h3>{deseado.nombreProducto}</h3>
                    <h5>${deseado.precioProducto}</h5>
                    <p>{deseado.descrProducto}</p>
                  </Link>
                </div>
                <div className="flex-shrink-1">
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminarDeseo(deseado.idProducto)}
                  >
                    <i
                      className="fa-solid fa-trash-can p-2"
                      style={{ color: "#ffffff" }}
                    ></i>
                  </button>
                </div>
              </div>
              <hr />
            </div>
          ))
        ) : (
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
                No tienes productos guardados en tu lista
              </h1>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default ListaDeseos;
