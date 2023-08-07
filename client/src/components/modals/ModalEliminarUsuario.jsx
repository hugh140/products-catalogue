import PropTypes from "prop-types";
import { useState } from "react";

function ModalEliminarUsuario({ idUsuario }) {
  const [pedidoError, setPedidoError] = useState(null);

  function eliminarUsuario() {
    setPedidoError(
      <i
        className="fa-solid fa-spinner fa-spin h3"
        style={{ color: "black" }}
      ></i>
    );

    fetch(`http://localhost:3000/usuarios?id=${idUsuario}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.ok) throw new Error();
        setPedidoError(
          <i className="fa-solid fa-check h3" style={{ color: "#00C100" }}></i>
        );
        window.location.reload();
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
        id={`eliminarModal${idUsuario}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Eliminar usuario:
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>¿Desea eliminar este usuario?</p>
              {pedidoError}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-danger"
                onClick={eliminarUsuario}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ModalEliminarUsuario.propTypes = {
  idUsuario: PropTypes.number,
};

export default ModalEliminarUsuario;
