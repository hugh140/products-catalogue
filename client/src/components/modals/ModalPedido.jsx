import PropTypes from "prop-types";
import { useState } from "react";

function ModalPedido({ producto }) {
  const [pedidoError, setPedidoError] = useState(null);

  function enviarPedido() {
    setPedidoError(
      <i
        className="fa-solid fa-spinner fa-spin h3"
        style={{ color: "black" }}
      ></i>
    );

    fetch(
      `http://localhost:3000/usuarios/enviarCorreo?idProducto=${producto?.idProducto}`,
      { method: "POST", credentials: "include" }
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.ok) throw new Error();
        setPedidoError(
          <i className="fa-solid fa-check h3" style={{ color: "#00C100" }}></i>
        );
        window.location.reload()
      })
      .catch(() => {
        setPedidoError(
          <i className="fa-solid fa-xmark h3" style={{ color: "#ff0000" }}></i>
        );
      });
  }

  return (
    <>
      <div
        className="modal fade"
        id="openModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Desea realizar el pedido de:
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Nombre producto:</strong> {producto?.nombreProducto}
              </p>
              <p>
                <strong>Precio producto:</strong> {producto?.precioProducto}
              </p>
              <p>
                <strong>Descripción producto:</strong> {producto?.descrProducto}
              </p>
              <br />
              {pedidoError}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={enviarPedido}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ModalPedido.propTypes = {
  producto: PropTypes.object,
};

export default ModalPedido;
