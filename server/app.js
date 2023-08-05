const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require('cors')
const PORT = process.env.PORT || 3000;

const productos = require("./routes/productosRoute");
const usuarios = require("./routes/usuariosRoute");
const comentarios = require("./routes/comentRoute");
const lista = require("./routes/listaRoute");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("files/imgs"));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use("/productos", productos);
app.use("/usuarios", usuarios);
app.use("/comentarios", comentarios);
app.use("/lista", lista);

app.listen(PORT, () => {
  console.log("Already connected to port", PORT);
});
