import base64 from "base-64";

function  getUserId() {
  if (!document.cookie) return

  const cookie = document.cookie.split('=')[1]
  const secondJWT = cookie.split('.')[1]
  const decodedJWT = base64.decode(secondJWT)
  const parseJSON = JSON.parse(decodedJWT)
  
  return parseJSON.usuario.id
}

export default getUserId