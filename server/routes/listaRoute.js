const express = require("express");
const router = express.Router();
const ListaController = require("../controllers/listaController");

router.post("/", ListaController.post);

router.get("/", ListaController.get);

router.delete("/", ListaController.delete);

module.exports = router;
