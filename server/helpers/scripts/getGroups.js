function getGroups(objeto) {
  let nombreProducto = "";
  let indexGrupo = 0;
  let resultado = [];
  for (const atributo of objeto) {
    if (atributo.nombreProducto !== nombreProducto) {
      nombreProducto = atributo.nombreProducto;
      resultado.push({
        idProducto: atributo.idProducto,
        nombreProducto: atributo.nombreProducto,
        imgProducto: atributo.imgProducto,
        comentarios: [],
      });
      indexGrupo++;
    }
    resultado[indexGrupo - 1].comentarios.push({
      idComentario: atributo.idComentario,
      textoComentario: atributo.textoComentario,
    });
  }
  return resultado;
}
module.exports = getGroups
