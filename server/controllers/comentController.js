const errorMessage = require("../helpers/scripts/controllerErrors");
require("dotenv").config();

const ComentModel = require("../models/comentModel");

class ComentController {
  static post(req, res) {
    try {
      const data = req.query;
      const token = req.cookies.PFToken;

      if (!data.comentario || !data.idProducto)
        throw new Error("Algún campo está vacío. Por favor, verifique.");
      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      ComentModel.post(res, data, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static put(req, res) {
    try {
      const data = req.query;
      const token = req.cookies.PFToken;

      if (!data.comentario || !data.idProducto || !data.idComentario)
        throw new Error("Algún campo está vacío. Por favor, verifique.");
      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      ComentModel.put(res, data, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static delete(req, res) {
    try {
      const id = req.query.idComentario;
      const token = req.cookies.PFToken;

      if (!id) throw new Error("Id de usuario inexistente.");
      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      ComentModel.delete(res, id, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }
}

module.exports = ComentController;
