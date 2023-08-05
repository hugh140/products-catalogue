import { useEffect } from "react";
import { useState } from "react";

function useProductos() {
  const [productos, setProductos] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/productos/getProductos", {
      method: "GET",
    })
      .then((result) => result.json())
      .then((json) => setProductos(json));
  }, []);

  return productos;
}

export default useProductos;
