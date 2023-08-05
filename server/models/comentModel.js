const connection = require("../helpers/db/dbConexion");
const errorMessage = require("../helpers/scripts/controllerErrors");
const jwt = require("jsonwebtoken");
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
    const sql =
      "DELETE FROM comentarios WHERE idComentario = ? AND idUsuario = ?";

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);

      const prepareData = [id, decoded.usuario.id];

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
