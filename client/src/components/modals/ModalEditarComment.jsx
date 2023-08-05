import PropTypes from "prop-types";
import { useState } from "react";

function ModalEditarComment({ comentario, idProducto }) {
  const [pedidoError, setPedidoError] = useState(null);

  function editarComentario(event) {
    event.preventDefault();

    setPedidoError(
      <i
        className="fa-solid fa-spinner fa-spin h3"
        style={{ color: "black" }}
      ></i>
    );

    fetch(
      `http://localhost:3000/comentarios?comentario=${event.target[0].value}&idProducto=${idProducto}&idComentario=${comentario.idComentario}`,
      { method: "PUT", credentials: "include" }
    )
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
        id={`editModal${comentario.idComentario}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Editar comentario:
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
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Escribe un comentario"
                  aria-label="default input example"
                  name="texto"
                  defaultValue={comentario.textoComentario}
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
                <button type="submit" className="btn btn-success">
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

ModalEditarComment.propTypes = {
  comentario: PropTypes.object,
  idProducto: PropTypes.number,
};

export default ModalEditarComment;
