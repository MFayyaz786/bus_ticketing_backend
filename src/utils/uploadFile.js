const fs = require("fs");

const saveFile = async (file) => {
  try {
    const [, fileType, fileData] = file.match(/^data:(.+);base64,(.+)$/);
    const fileBuffer = new Buffer.from(fileData, "base64");
    const fileName = Date.now() + "." + fileType.split("/")[1];
    const filePath = "public/images/" + fileName;
    await fs.promises.writeFile(filePath, fileBuffer);
    return "images/" + fileName;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = saveFile;
