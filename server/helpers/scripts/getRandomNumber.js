function getRandomNumber() {
  let numero = "";
  for (let i = 0; i < 6; i++) {
    numero += String(parseInt(Math.random() * 9));
  }

  return numero;
}

module.exports = getRandomNumber;
