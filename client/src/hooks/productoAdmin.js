import { useEffect } from "react";
import { useState } from "react";
import fileBinaries from "../scripts/fileBinaries";

function useProducto(id, callback) {
  const [producto, setProducto] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/productos/getProducto?id=${id}`, {
      method: "GET",
    })
      .then((result) => result.json())
      .then((json) => {
        fetch(json.imgProducto)
          .then((result) => result.blob())
          .then((response) =>
            fileBinaries.getHex(response, (result) => {
              setProducto({ ...json, imgHex: result });
              callback(result);
            })
          );
      });
  }, [id]);

  return producto;
}

export default useProducto;
