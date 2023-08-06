class fileBinaries {
  static getUrl(file, callback) {
    const reader = new FileReader();

    reader.onload = callback;
    reader.readAsDataURL(file);
  }

  static getHex(file, callback) {
    const reader = new FileReader();

    reader.onload = () => {
      let uint8View = new Uint8Array(reader.result);

      let hexBinaries = "";
      for (let i = 0; i < uint8View.length; i++) {
        const charVal = uint8View[i];
        hexBinaries =
          hexBinaries + (charVal < 16 ? "0" : "") + dec2hex(charVal);
      }
      callback(hexBinaries)
    };
    reader.readAsArrayBuffer(file);
  }
}

function dec2hex(d) {
  const hD = "0123456789ABCDEF";
  let h = hD.substr(d & 15, 1);
  while (d > 15) {
    d >>= 4;
    h = hD.substr(d & 15, 1) + h;
  }
  return h;
}

export default fileBinaries;
