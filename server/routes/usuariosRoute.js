const express = require("express");
const router = express.Router();
const UsuariosController = require("../controllers/usuariosController");

router.post("/registo", UsuariosController.postRegistro);
router.post("/comprobar", UsuariosController.postComprobar);
router.post("/login", UsuariosController.postLogin);
router.post("/enviarCorreo", UsuariosController.postCorreo);

router.get("/obtenerTodos", UsuariosController.getUsuarios);
router.get("/obtenerMiCuenta", UsuariosController.getUsuario);

router.put("/admin", UsuariosController.putAdmin);
router.put("/usuario", UsuariosController.putUsuario);

router.delete("/", UsuariosController.delete);

module.exports = router;
