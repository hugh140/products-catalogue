const express = require("express");
const router = express.Router();
const ComentController = require("../controllers/comentController");

router.post("/", ComentController.post);

router.get("/", ComentController.get);

router.put("/", ComentController.put);

router.delete("/", ComentController.delete);

module.exports = router;
