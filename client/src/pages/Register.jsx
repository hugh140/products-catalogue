import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorAlert";

function Register() {
  const [error, setError] = useState(null);

  function submitForm(event) {
    event.preventDefault();

    const nombre = event.target[0].value;
    const email = event.target[1].value;
    const pass1 = event.target[2].value;
    const pass2 = event.target[3].value;

    if (pass1 !== pass2) {
      throw setError(
        <ErrorMessage type={"danger"}>
          Las contraseñas no emparejan.
        </ErrorMessage>
      );
    }

    setError(
      <i
        className="fa-solid fa-spinner fa-spin h3"
        style={{ color: "black" }}
      ></i>
    );

    fetch(
      `http://localhost:3000/usuarios/registo?nombre=${nombre}&correo=${email}&pass=${pass1}`,
      { method: "POST" }
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.ok) throw "Este correo o usuario ya está registrado";
        setError(
          <i className="fa-solid fa-check h3" style={{ color: "#00C100" }}></i>
        );
        window.location.href = `/comprobar/${nombre}`;
      })
      .catch((error) => {
        setError(<ErrorMessage type={"danger"}>{error}</ErrorMessage>);
      });
  }

  return (
    <main
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div>
        <h1>¡Regístrate ahora a Phone Shop!</h1>
        <form className="my-3" onSubmit={submitForm}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Nombre de Usuario:
            </label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Julio Erick"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Correo Electrónico:
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="nombre@ejemplo.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword1" className="form-label">
              Contraseña:
            </label>
            <input
              type="password"
              name="pas1"
              id="inputPassword1"
              className="form-control"
              aria-describedby="passwordHelpInline"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword2" className="form-label">
              Confirma la Contraseña:
            </label>
            <input
              type="password"
              name="pass2"
              id="inputPassword2"
              className="form-control"
              aria-describedby="passwordHelpInline"
            />
          </div>
          {error}
          <input
            type="submit"
            className="btn btn-secondary mb-3 w-100"
            value="Registrar"
          />
        </form>

        <p className="text-center">
          ¿Ya dispones de una cuenta? <Link to="/Login">Inicia Sesión</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
