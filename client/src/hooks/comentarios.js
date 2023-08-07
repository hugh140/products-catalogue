import { useEffect } from "react";
import { useState } from "react";

function useComentarios(nombre) {
  const [comentarios, setComentarios] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/comentarios?nombre=${nombre}`, {
      method: "GET",
      credentials: "include",
    })
      .then((result) => result.json())
      .then((json) => setComentarios(json));
  }, [nombre]);

  return comentarios;
}

export default useComentarios;
