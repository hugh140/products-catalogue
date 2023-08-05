function emailContent(producto, usuario) {
  return `
  <br><br><br><hr>
  <div style="text-align: center; font-family: sans-serif; width: 80%; margin: auto">
  
    <h2>¡Hola, <span style="font-size: 2rem">${usuario.nombreUsuario}</span>!</h2>

    <p>Tu pedido <strong>${producto.nombreProducto}</strong> está procesándose.</p>
    <p>Los detalles los tienes a continuación:</p>

    <img style="box-shadow: 0 10px 23px 0px rgba(0,0,0,0.75);" src="${producto.imgProducto}">

    <br><br><br><hr>

    <table style="width: 100%; text-align: left">
      <tr>
        <td>
          <h3>Nombre:</h3>
        </td>
        <td>
          <p>${producto.nombreProducto}</p>
        </td>
      </tr>
      <tr>
        <td>
          <h3>Precio:</h3>
        </td>
        <td>
          <p>$${producto.precioProducto}</p>
        </td>
      </tr>
      <tr>
        <td>
            <h3>Descripción:</h3>
        </td>
        <td>
          <p>${producto.descrProducto}</p>
        </td>
      </tr>
      <tr>
        <td>
          <h3>Especificaciones:</h3>
        </td>
        <td>
          <p>${producto.especProducto}</p>
        </td>
      </tr>
      <tr>
        <td>
          <h3>Fecha de procesamiento:</h3>
        </td>
        <td>
          <p>${Date.now()}</p>
        </td>
      </tr>
    </table>
  </div>
  `;
}

module.exports = emailContent;
