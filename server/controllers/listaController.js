const errorMessage = require("../helpers/scripts/controllerErrors");
require("dotenv").config();

const ListaModel = require("../models/listaModel");

class ListaController {
  static post(req, res) {
    try {
      const id = req.query.idProducto;
      const token = req.cookies.PFToken;

      if (!id) throw new Error("Id de producto inexistente.");
      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      ListaModel.post(res, id, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static get(req, res) {
    try {
      const token = req.cookies.PFToken;

      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      ListaModel.get(res, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static delete(req, res) {
    try {
      const id = req.query.id;
      const token = req.cookies.PFToken;

      if (!id) throw new Error("Id de producto inexistente.");
      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      ListaModel.delete(res, id, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }
}

module.exports = ListaController;
