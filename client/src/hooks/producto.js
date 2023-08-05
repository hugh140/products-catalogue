import { useEffect } from "react";
import { useState } from "react";

function useProducto(id) {
  const [producto, setProducto] = useState();

  useEffect(() => {
    if (document.cookie)
      fetch(`http://localhost:3000/productos/getProductoAuth?id=${id}`, {
        method: "GET",
        credentials: "include",
      })
        .then((result) => result.json())
        .then((json) => setProducto(json));
    else
      fetch(`http://localhost:3000/productos/getProducto?id=${id}`, {
        method: "GET",
      })
        .then((result) => result.json())
        .then((json) => setProducto(json));
  }, [id]);

  return producto;
}

export default useProducto;
