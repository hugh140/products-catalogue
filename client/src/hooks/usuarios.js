import { useEffect } from "react";
import { useState } from "react";

function useUsuarios() {
  const [usuarios, setUsuarios] = useState();

  useEffect(() => {
    if (document.cookie)
      fetch("http://localhost:3000/usuarios/obtenerTodos", {
        method: "GET",
        credentials: "include",
      })
        .then((result) => result.json())
        .then((json) => setUsuarios(json));
    else window.location.href = "/";
  }, []);

  return usuarios;
}

export default useUsuarios;
