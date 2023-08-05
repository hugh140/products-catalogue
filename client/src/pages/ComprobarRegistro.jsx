import { useState } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorAlert";

function ComprobarRegistro() {
  const [error, setError] = useState(null);
  const { nombre } = useParams();

  function enviarCodigo(event) {
    event.preventDefault();

    const codigo = event.target[0].value;

    if (!codigo)
      setError(
        <ErrorMessage type="danger">Procura ingresar el código.</ErrorMessage>
      );

    fetch(
      `http://localhost:3000/usuarios/comprobar?nombre=${nombre}&codigo=${codigo}`,
      { method: "POST", credentials: "include" }
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.ok) throw "El código ingresado es incorrecto.";
        setError(
          <ErrorMessage type="success">
            Te has registrado correctamente.
          </ErrorMessage>
        );
        window.location.href = "/";
      })
      .catch((error) =>
        setError(<ErrorMessage type="danger">{error}</ErrorMessage>)
      );
  }

  return (
    <main
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div>
        <h1 className="text-center">¡Revisa tu Correo!</h1>
        <form className="my-3" onSubmit={enviarCodigo}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Hemos enviado un código a tu cuenta, ¡pégalo aquí!
            </label>
            <input
              type="text"
              className="form-control text-center"
              name="email"
              id="exampleFormControlInput1"
              placeholder="123456"
            />
          </div>
          {error}
          <input
            type="submit"
            className="btn btn-secondary mb-3 w-100"
            value="Enviar"
          />
        </form>
      </div>
    </main>
  );
}

export default ComprobarRegistro;
