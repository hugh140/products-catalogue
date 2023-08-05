import { useEffect } from "react";
import { useState } from "react";

function useUsuario(id) {
  const [usuario, setUsuario] = useState();

  useEffect(() => {
    if (document.cookie)
      fetch("http://localhost:3000/usuarios/obtenerMiCuenta", {
        method: "GET",
        credentials: "include",
      })
        .then((result) => result.json())
        .then((json) => setUsuario(json));
    else window.location.href = "/";
  }, [id]);

  return usuario;
}

export default useUsuario;
