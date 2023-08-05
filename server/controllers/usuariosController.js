const errorMessage = require("../helpers/scripts/controllerErrors");
require("dotenv").config();

const UsuarioModel = require("../models/usuariosModel");

class UsuariosController {
  static postRegistro(req, res) {
    try {
      const data = req.query;

      if (!data.nombre || !data.correo || !data.pass)
        throw new Error("Algún campo está vacío. Por favor, verifique.");

      UsuarioModel.postRegistro(res, data);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static postComprobar(req, res) {
    try {
      const data = req.query;

      if (!data.nombre || !data.codigo)
        throw new Error("Algún campo está vacío. Por favor, verifique.");

      UsuarioModel.postComprobar(res, data);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static postLogin(req, res) {
    try {
      const data = req.query;

      if (!data.correo || !data.pass)
        throw new Error("Algún campo está vacío. Por favor, verifique.");

      UsuarioModel.postLogin(res, data);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static postCorreo(req, res) {
    try {
      const id = req.query.idProducto;
      const token = req.cookies.PFToken;

      if (!id) throw new Error("Id de producto inexistente.");
      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      UsuarioModel.postCorreo(res, id, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static getUsuarios(req, res) {
    try {
      const token = req.cookies.PFToken;
      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      UsuarioModel.getUsuarios(res, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static getUsuario(req, res) {
    try {
      const token = req.cookies.PFToken;
      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      UsuarioModel.getUsuario(res, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static putAdmin(req, res) {
    try {
      const data = req.query;
      const token = req.cookies.PFToken;

      if (!data.id || !data.nombre || !data.pass || !data.permiso)
        throw new Error("Algún campo está vacío. Por favor, verifique.");
      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      UsuarioModel.putAdmin(res, data, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static putUsuario(req, res) {
    try {
      const data = req.query;
      const token = req.cookies.PFToken;

      if (!data.nombre) throw new Error("Introduzca un nombre válido.");
      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      UsuarioModel.putUsuario(res, data, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }

  static delete(req, res) {
    try {
      const id = req.query.id;
      const token = req.cookies.PFToken;

      if (!id) throw new Error("Id de usuario inexistente.");
      if (!token)
        throw new Error("No dispone del token de sesión para esta operación.");

      UsuarioModel.delete(res, id, token);
    } catch (error) {
      errorMessage(res, error, 400);
    }
  }
}

module.exports = UsuariosController;
