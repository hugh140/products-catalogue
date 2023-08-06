import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import useProductos from "../hooks/productos";
import ModalEliminarProducto from "../components/modals/ModalEliminarProducto";

function AdminProductos() {
  const productos = useProductos();

  return (
    <>
      <NavBar lista={Boolean(document.cookie)} />

      <main className="container" style={{ marginTop: "7rem" }}>
        <h1 className="display-4 text-center">Lista de Productos</h1>

        <Link to="/admin/productos/subir" className="btn btn-success">
          <i className="fa-solid fa-plus me-2"></i>Agregar producto
        </Link>

        {productos?.map((producto) => (
          <div key={producto.idProducto}>
            <div className="w-100">
              <hr />
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
                    <h5>${producto.precioProducto}</h5>
                    <p>{producto.descrProducto}</p>
                  </Link>
                </div>
                <div className="flex-shrink-1">
                  <div className="d-flex flex-column mb-3">
                    <button className="btn btn-warning mb-2">
                      <i
                        className="fa-solid fa-pen-to-square p-2"
                        style={{ color: "white" }}
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target={`#eliminarModal${producto.idProducto}`}
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

            <ModalEliminarProducto idProducto={producto.idProducto} />
          </div>
        ))}
      </main>

      <Footer />
    </>
  );
}

export default AdminProductos;
