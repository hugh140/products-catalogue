import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Footer from "../components/Footer";

import useProductos from "../hooks/productos";

function Landing() {
  const productos = useProductos();

  return (
    <>
      <NavBar lista={Boolean(document.cookie)} />

      <div
        className="d-flex justify-content-center align-items-center mb-5"
        style={{
          height: "100vh",
          background:
            "linear-gradient(180deg, rgba(139,139,139,1) 0%, rgba(0,15,43,1) 0%, rgba(255,255,255,1) 100%)",
        }}
      >
        <div style={{ color: "white" }}>
          <h1
            className="text-center display-1 mb-3"
            style={{ textShadow: "black 1px 0 10px" }}
          >
            Cellphora
          </h1>
          <h2 className="text-center" style={{ textShadow: "black 1px 0 5px" }}>
            Tu tienda de smarthphones preferida.
          </h2>
        </div>
      </div>

      <main className="container mx-auto" style={{ width: "90%" }}>
        <h1 className="my-5">Catálogo:</h1>

        <div className="row justify-content-md-center">
          {productos?.map((producto) => (
            <div
              key={producto.idProducto}
              className="col-sm-12 col-md-6 col-lg-4 mb-5"
            >
              <Card data={producto} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Landing;
