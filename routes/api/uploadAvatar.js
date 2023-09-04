const path = require("path");
const fs = require("fs").promises;
const multer = require("multer");
// const jimp = require("jimp");

const uploadDir = path.join(process.cwd(), "tmp");
const storeAvatars = path.join(process.cwd(), "public", "avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

const uploadFolders = async () => {
  try {
    await createFolderIsNotExist(uploadDir);
    await createFolderIsNotExist(storeAvatars);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  upload,
  uploadFolders,
  uploadDir,
  storeAvatars,
};
