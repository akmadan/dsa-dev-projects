import multer from "multer";

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    cb(null, "uploads/"); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});

const upload = multer({ storage: storage });

export default upload;