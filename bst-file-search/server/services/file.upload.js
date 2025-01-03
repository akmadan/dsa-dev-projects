import multer from "multer";
// import { v4 as uuid } from 'uuid';

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      // , uuid() + "-" +
      file.originalname
    ); // Unique file name
  },
});

const upload = multer({ storage: storage });

export default upload;
