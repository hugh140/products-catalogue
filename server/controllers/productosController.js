const errorMessage = require("../helpers/scripts/controllerErrors");
const ProductoModel = require("../models/productosModel");

class ProductosController {
  static post(req, res) {
    try {
      const data = req.body;
      const token = req.cookies.PFToken;

      if (!data) throw new Error("El contenido está vacío.");
      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      ProductoModel.post(res, data, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static getProductos(req, res) {
    try {
      ProductoModel.getProductos(res);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static getProducto(req, res) {
    try {
      const id = req.query.id;

      if (!id) throw new Error('Id de producto inexistente.')

      ProductoModel.getProducto(res, id);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static getProductoAuth(req, res) {
    try {
      const id = req.query.id;
      const token = req.cookies.PFToken;

      if (!id) throw new Error('Id de producto inexistente.')
      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      ProductoModel.getProductoAuth(res, id, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static put(req, res) {
    try {
      const data = req.body;
      const id = req.query.id;
      const token = req.cookies.PFToken;

      if (!data) throw new Error("El contenido está vacío.");
      if (!id) throw new Error('Id de producto inexistente.')
      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      ProductoModel.put(res, data, id, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static delete(req, res) {
    try {
      const id = req.query.id;
      const token = req.cookies.PFToken;

      if (!id) throw new Error('Id de producto inexistente.')
      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      ProductoModel.delete(res, id, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }
}

module.exports = ProductosController;
