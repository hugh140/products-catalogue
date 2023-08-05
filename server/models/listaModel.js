const connection = require("../helpers/db/dbConexion");
const errorMessage = require("../helpers/scripts/controllerErrors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;

class ListaModel {
  static post(res, id, token) {
    const sqlComprobar =
      "SELECT idUsuario FROM listadeseados WHERE idUsuario = ? AND idProducto = ?";
    const sqlInsertar = "INSERT INTO listadeseados VALUES ('', ?, ?)";

    let comprobarExistencia;

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);
      const prepareData = [decoded.usuario.id, id];

      connection.execute(sqlComprobar, prepareData, (error, result) => {
        try {
          if (error) throw new Error(error);
          comprobarExistencia = result.length;

          if (!comprobarExistencia) {
            connection.execute(sqlInsertar, prepareData, (error) => {
              try {
                if (error) throw new Error(error);
                else
                  res.json({
                    message:
                      "El producto se ha guardado en tu lista correctamente.",
                    ok: true,
                  });
              } catch (e) {
                errorMessage(res, e, 400);
              }
            });
          } else {
            throw new Error("Este producto ya existe en tu lista");
          }
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }

  static get(res, token) {
    const sql =
      "SELECT productos.idProducto, nombreProducto, imgProducto, descrProducto, precioProducto FROM listadeseados INNER JOIN productos ON productos.idProducto = listadeseados.idProducto WHERE idUsuario = ?";

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);

      connection.execute(sql, [decoded.usuario.id], (error, result) => {
        try {
          if (error) throw new Error(error);
          else res.json(result);
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }

  static delete(res, id, token) {
    const sql =
      "DELETE FROM listadeseados WHERE idUsuario = ? AND idProducto = ?";

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);

      const prepareData = [decoded.usuario.id, id];

      connection.execute(sql, prepareData, (error, result) => {
        try {
          if (error) throw new Error(error);
          else
            res.json({
              message: "El producto se ha quitado de tu lista correctamente.",
              ok: true,
            });
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }
}

module.exports = ListaModel;
