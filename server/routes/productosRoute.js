const express = require("express");
const router = express.Router();
const ProductosController = require("../controllers/productosController");

router.post("/", ProductosController.post);

router.get("/getProductos", ProductosController.getProductos);
router.get("/getProducto", ProductosController.getProducto);
router.get("/getProductoAuth", ProductosController.getProductoAuth);

router.put("/", ProductosController.put);

router.delete("/", ProductosController.delete);

module.exports = router;
