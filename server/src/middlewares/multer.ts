import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
  destination: (req, file, cb) => {
    cb(null, "src/public/images/users");
  },
});
const postImagestorage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
  destination: (req, file, cb) => {
    cb(null, "src/public/images/posts");
  },
});

export const uploadUserImage = multer({ storage });
export const uploadPostImage = multer({ storage: postImagestorage });
