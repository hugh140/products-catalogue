import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

import fileBinaries from "../scripts/fileBinaries";
import ErrorMessage from "../components/ErrorAlert";

function SubirProductos() {
  const [imageZone, setImageZone] = useState(null);
  const [error, setError] = useState(null);
  const [imgHex, setImgHex] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      setError(
        <i
          className="fa-solid fa-spinner fa-spin h3 mt-3"
          style={{ color: "black" }}
        ></i>
      );
      fileBinaries.getHex(files[0], (result) => setImgHex(result));
      fileBinaries.getUrl(files[0], (e) => {
        setImageZone(
          <img
            src={e.target.result}
            alt=""
            className="img-fluid mh-100"
            style={{ opacity: 0.4 }}
          />
        );
        setError(null);
      });
    },
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  function subirProducto(event) {
    event.preventDefault();

    setError(
      <i
        className="fa-solid fa-spinner fa-spin h3 mt-3"
        style={{ color: "black" }}
      ></i>
    );

    const json = {
      nombre: event.target[0].value,
      descripcion: event.target[1].value,
      especificacion: event.target[2].value,
      precio: event.target[3].value,
      imagen: imgHex,
    };

    for (const value of Object.values(json))
      if (!value)
        throw setError(
          <ErrorMessage type="danger">
            Rellena los campos faltantes.
          </ErrorMessage>
        );

    fetch("http://localhost:3000/productos", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.ok) throw new Error("Existen campos faltantes, revísalos.");
        setError(
          <ErrorMessage type="success">
            Producto registrado correctamente.
          </ErrorMessage>
        );
        window.location.href = "/admin/productos";
      })
      .catch(() => {
        setError(
          <ErrorMessage type="danger">
            La imagen tiene un peso muy grande, cámbiala.
          </ErrorMessage>
        );
      });
  }

  return (
    <>
      <NavBar lista={Boolean(document.cookie)} />

      <main className="container mx-auto w-75" style={{ marginTop: "7rem" }}>
        <h1 className="display-5">Agregar Producto</h1>

        <div className="row w-100">
          <div className="col-md-6 col-sm-12">
            <div
              {...getRootProps()}
              className={`border border-dark rounded mt-4 ${
                !imageZone && "h-50"
              } d-flex justify-content-center
                text-center align-items-center position-relative mb-5`}
              style={{
                cursor: "pointer",
                minHeight: "10rem",
                minWidth: "10rem",
              }}
            >
              <input {...getInputProps()} />
              {imageZone}

              <div className="position-absolute p-4">
                <i
                  className="fa-solid fa-plus fs-1"
                  style={{ color: "black" }}
                ></i>
                {isDragActive ? (
                  <p>Suelta la imagen aquí</p>
                ) : (
                  <p>Arrastra la imagen, o dame un click.</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <h3>Información del producto</h3>
            <form onSubmit={subirProducto}>
              <label htmlFor="nombre" className="my-2">
                Nombre:
              </label>
              <input type="text" className="form-control" id="nombre" />
              <label htmlFor="desc" className="my-2">
                Descripción:
              </label>
              <textarea className="form-control" id="desc" rows={3} />
              <label htmlFor="espec" className="my-2">
                Especificación:
              </label>
              <textarea className="form-control" id="espec" rows={5} />
              <label htmlFor="precio" className="my-2">
                Precio:
              </label>
              <input type="number" className="form-control w-25" />
              <input
                type="submit"
                className={`btn btn-outline-dark mt-3`}
                value="Agregar"
              />
              <br />
              {error}
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default SubirProductos;
