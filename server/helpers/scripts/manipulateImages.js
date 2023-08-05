const { writeFileSync, existsSync, unlinkSync } = require("fs");

const imagesDir = __dirname + "/../../files/imgs/";

function saveImgBinaries(binaries) {
    let fileName = Date.now();

    if (existsSync(imagesDir + fileName)) fileName++;

    const dirFile = `${imagesDir}/${fileName}.png`;
    const imgBinaries = Buffer.from(binaries, "hex");

    writeFileSync(dirFile, imgBinaries);

    return `${process.env.SERVER_URL}/${fileName}.png`;
}

function deleteImages(imageURL) {
  const fileName = imageURL.split("/").at(-1);
  unlinkSync(imagesDir + fileName);
}

module.exports = { deleteImages, saveImgBinaries };
