import multer, { diskStorage } from "multer";

const storage = diskStorage({
  destination: "src/uploads",
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
