import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Producto from "./pages/Producto";
import ListaDeseos from "./pages/ListaDeseos";
import PanelUsuario from "./pages/PanelUsuario";
import ComprobarRegistro from "./pages/ComprobarRegistro";
import AdminProductos from "./pages/AdminProductos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/producto/:idProducto" element={<Producto />} />
        <Route path="/deseados" element={<ListaDeseos />} />
        <Route path="/cuenta" element={<PanelUsuario />} />
        <Route path="/comprobar/:nombre" element={<ComprobarRegistro />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
