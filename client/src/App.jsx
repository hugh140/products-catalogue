import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Producto from "./pages/Producto";
import ListaDeseos from "./pages/ListaDeseos";
import PanelUsuario from "./pages/PanelUsuario";
import ComprobarRegistro from "./pages/ComprobarRegistro";
import AdminProductos from "./pages/admin/AdminProductos";
import SubirProductos from "./pages/admin/SubirProductos";
import EditarProductos from "./pages/admin/EditarProducto";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminComentarios from "./pages/admin/AdminComentarios";

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
        <Route path="/admin/productos/subir" element={<SubirProductos />} />
        <Route path="/admin/productos/editar/:id" element={<EditarProductos />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/usuarios/:nombre" element={<AdminComentarios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
