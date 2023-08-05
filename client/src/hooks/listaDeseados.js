import { useEffect } from "react";
import { useState } from "react";

function useListaDeseados() {
  const [lista, setLista] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/lista`, {
      method: "GET",
      credentials: "include",
    })
      .then((result) => result.json())
      .then((json) => setLista(json));
  }, []);

  return lista;
}

export default useListaDeseados;
