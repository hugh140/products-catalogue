import PropTypes from "prop-types";
import { useState } from "react";

import ErrorMessage from "../ErrorAlert";

function ModalEditarUsuario({ nombreUsuario }) {
  const [pedidoError, setPedidoError] = useState(null);

  function editarComentario(event) {
    event.preventDefault();

    const nombre = event.target[0].value;

    if (!nombre) throw setPedidoError(
      <ErrorMessage type="danger">
        Introzduca un nombre de usuario válido.
      </ErrorMessage>
    );

    if (nombre === nombreUsuario)
      throw setPedidoError(
        <ErrorMessage type="danger">
          El nombre introducido es el mismo.
        </ErrorMessage>
      );

    fetch(`http://localhost:3000/usuarios/usuario?nombre=${nombre}`, {
      method: "PUT",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.ok) throw "Este usuario ya existe";
        setPedidoError(
          <ErrorMessage type="success">
            Tu información se ha actualizado correctamente.
          </ErrorMessage>
        );
        window.location.reload();
      })
      .catch((error) => {
        setPedidoError(<ErrorMessage type="danger">{error}</ErrorMessage>);
      });
  }

  return (
    <>
      <div
        className="modal fade"
        id={"editarModal"}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Editar información:
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={editarComentario}>
              <div className="modal-body">
                <label htmlFor="nombreUsuario" className="mb-1">
                  Nombre de Usuario
                </label>
                <input
                  id="nombreUsuario"
                  className="form-control mb-3"
                  type="text"
                  placeholder="Escribe un comentario"
                  name="texto"
                  defaultValue={nombreUsuario}
                />
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
                <button type="submit" className="btn btn-warning">
                  Editar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

ModalEditarUsuario.propTypes = {
  nombreUsuario: PropTypes.string,
};

export default ModalEditarUsuario;
