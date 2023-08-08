import { Link, useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ModalPedido from "../components/modals/ModalPedido";
import Comments from "../components/Comments";

import useProducto from "../hooks/producto";

function Producto() {
  const { idProducto } = useParams();
  const producto = useProducto(idProducto);

  console.log(producto)

  function guardarDeseado() {
    if (!producto?.guardado)
      fetch(`http://localhost:3000/lista?idProducto=${idProducto}`, {
        method: "POST",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          if (!result.ok) return;
          window.location.reload();
        });
    else
      fetch(`http://localhost:3000/lista?id=${idProducto}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          if (!result.ok) return;
          window.location.reload();
        });
  }

  return (
    <>
      <NavBar lista={Boolean(document.cookie)} />

      <main className="container mx-auto w-75" style={{ marginTop: "7rem" }}>
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-5">
            <img
              className="img-fluid"
              src={producto?.imgProducto}
              alt={producto?.nombreProducto}
              width={400}
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <h1 className="display-4">{producto?.nombreProducto}</h1>
            <h1>${producto?.precioProducto}</h1>
            {document.cookie ? (
              <>
                <button
                  className={
                    "btn btn-" +
                    (producto?.guardado ? "outline-" : "") +
                    "warning me-3 mb-2 mt-3"
                  }
                  onClick={guardarDeseado}
                >
                  <i className="fa-regular fa-bookmark me-2"></i>
                  {producto?.guardado ? "Agregado" : "Agregar"}
                </button>
                <button
                  className="btn btn-dark mb-2 mt-3"
                  data-bs-toggle="modal"
                  data-bs-target="#openModal"
                >
                  <i className="fa-solid fa-truck me-2"></i>Realizar pedido
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="btn btn-dark mb-2 mt-3">
                  <i className="fa-solid fa-truck me-2"></i>Realizar pedido
                </button>
              </Link>
            )}

            <br />
            <br />
            <h3>Descripción</h3>
            <p className="mb-5">{producto?.descrProducto}</p>
          </div>
        </div>

        <h3 className="mt-2">Especificaciones</h3>
        <p className="mb-5" style={{whiteSpace: "pre-wrap"}}>{producto?.especProducto}</p>

        <Comments producto={producto} id={Number(idProducto)} />
      </main>

      <Footer />
      <ModalPedido producto={producto} />
    </>
  );
}

export default Producto;
