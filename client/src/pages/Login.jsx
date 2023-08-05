import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorAlert";
import { useState } from "react";

function Login() {
  const [passError, setPassError] = useState(null);

  function submitForm(event) {
    event.preventDefault();
    const email = event.target[0].value;
    const pass = event.target[1].value;

    fetch(`http://localhost:3000/usuarios/login?correo=${email}&pass=${pass}`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.ok) throw "Correo o contraseña incorrectos.";
        window.location.href = "/";
        setPassError(<ErrorMessage type={"success"}>Inicio de sesión exitoso.</ErrorMessage>);
      })
      .catch((error) => {
        setPassError(<ErrorMessage type={"danger"}>{error}</ErrorMessage>);
      });
  }

  return (
    <main
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div>
        <h1>¡Bienvenido a Phone Shop!</h1>
        <form className="my-3" onSubmit={submitForm}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Correo Electrónico:
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="exampleFormControlInput1"
              placeholder="nombre@ejemplo.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Contraseña:
            </label>
            <input
              type="password"
              id="inputPassword6"
              name="password"
              className="form-control"
              aria-describedby="passwordHelpInline"
            />
          </div>
          {passError}
          <input
            type="submit"
            className="btn btn-secondary mb-3 w-100"
            value="Ingresar"
          />
        </form>

        <p className="text-center">
          ¿Aún no dispones de una cuenta? <Link to="/Register">Regístrate</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
