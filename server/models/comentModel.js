const connection = require("../helpers/db/dbConexion");
const jwt = require("jsonwebtoken");

const errorMessage = require("../helpers/scripts/controllerErrors");
const getGroups = require("../helpers/scripts/getGroups");
require("dotenv").config();

const SECRET = process.env.SECRET;

class ComentModel {
  static post(res, data, token) {
    const sql = "INSERT INTO comentarios VALUES ('', ?, ?, ?)";

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);

      const prepareData = [
        data.comentario,
        decoded.usuario.id,
        data.idProducto,
      ];

      connection.execute(sql, prepareData, (error) => {
        try {
          if (error) throw new Error(error);
          else
            res.json({
              message: "El comentario se ha publicado correctamente.",
              ok: true,
            });
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }

  static get(res, nombre, token) {
    const sql =
      "SELECT productos.idProducto, idComentario, nombreProducto, imgProducto, textoComentario FROM comentarios INNER JOIN productos ON comentarios.idProducto = productos.idProducto INNER JOIN usuarios ON comentarios.idUsuario = usuarios.idUsuario WHERE usuarios.nombreUsuario = ? ORDER BY productos.idProducto DESC";

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);
      if (decoded.usuario.permiso !== "admin")
        throw new Error("El permiso del token es inválido.");

      connection.execute(sql, [nombre], (error, result) => {
        try {
          if (error) throw new Error(error);
          res.json(getGroups(result));
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }

  static put(res, data, token) {
    const sql =
      "UPDATE comentarios SET textoComentario = ?, idProducto = ? WHERE idComentario = ? AND idUsuario = ?";

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);

      const prepareData = [
        data.comentario,
        data.idProducto,
        data.idComentario,
        decoded.usuario.id,
      ];

      connection.execute(sql, prepareData, (error) => {
        try {
          if (error) throw new Error(error);
          else
            res.json({
              message: "El comentario se ha actualizado correctamente.",
              ok: true,
            });
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }

  static delete(res, id, token) {
    let sql = "DELETE FROM comentarios WHERE idComentario = ?";

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);
      const prepareData = [id];

      if (decoded.usuario.permiso !== "admin") {
        sql += " AND idUsuario = ?";
        prepareData.push(decoded.usuario.id);
      }

      connection.execute(sql, prepareData, (error) => {
        try {
          if (error) throw new Error(error);
          else
            res.json({
              message: "El comentario se ha eliminado correctamente.",
              ok: true,
            });
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }
}

module.exports = ComentModel;
