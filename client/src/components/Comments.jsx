import ErrorMessage from "../components/ErrorAlert";
import ModalEditarComment from "../components/modals/ModalEditarComment";
import ModalEliminarComment from "../components/modals/ModalEliminarComment";
import getUserId from "../scripts/getUserId";

import { useState } from "react";
import PropTypes from "prop-types";

function Comments({ producto, id }) {
  const [submitBtn, setSubmitBtn] = useState(null);
  const [passError, setPassError] = useState(null);

  getUserId();

  function onFocus() {
    setSubmitBtn(
      <input
        className="btn btn-outline-secondary mt-2"
        type="submit"
        value="Publicar"
      />
    );
  }

  function onBlur() {
    setTimeout(() => setSubmitBtn(null), 100);
  }

  function comentar(event) {
    event.preventDefault();
    if (!document.cookie) window.location.href = "/login";

    fetch(
      `http://localhost:3000/comentarios?comentario=${event.target[0].value}&idProducto=${id}`,
      { method: "POST", credentials: "include" }
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.ok) throw "Ha ocurrido un error al publicar el comentario.";
        window.location.reload();
      })
      .catch((error) => {
        setPassError(<ErrorMessage type={"danger"}>{error}</ErrorMessage>);
      });
  }

  return (
    <>
      <h3 className="mt-2" id="comentarios">
        Comentarios ({producto?.comentarios.length})
      </h3>

      <form className="my-4" onSubmit={comentar}>
        <textarea
          rows={3}
          className="form-control"
          type="text"
          placeholder="Escribe un comentario"
          aria-label="default input example"
          onFocus={onFocus}
          onBlur={onBlur}
          name="texto"
          style={{ resize: "none" }}
        />
        {submitBtn}
        {passError}
      </form>

      {producto?.comentarios.map((comentario, index) => (
        <div key={index}>
          <hr />
          <div className="d-flex">
            <div style={{ overflow: "hidden" }} className="w-100">
              <h4>{comentario.nombreUsuario}</h4>
              <p>{comentario.textoComentario}</p>
            </div>
            {getUserId() === comentario.idUsuario ? (
              <div className="d-flex flex-column mb-3">
                <button
                  className="btn btn-warning mb-2"
                  data-bs-toggle="modal"
                  data-bs-target={`#editModal${comentario.idComentario}`}
                >
                  <i
                    className="fa-solid fa-pen-to-square p-2"
                    style={{ color: "white" }}
                  ></i>
                </button>
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
                <ModalEditarComment comentario={comentario} idProducto={id} />
                <ModalEliminarComment idComentario={comentario.idComentario} />
              </div>
            ) : null}
          </div>
          <hr />
        </div>
      ))}
    </>
  );
}

Comments.propTypes = {
  producto: PropTypes.object,
  id: PropTypes.number,
};

export default Comments;
