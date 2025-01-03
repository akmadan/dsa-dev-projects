import express from "express";
import upload from "./services/file.upload.js";
import BinaryTree from "./schemas/tree.schema.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const tree = new BinaryTree();

// Upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  // Insert file metadata into binary tree
  tree.insert(file.filename, {
    path: file.path,
    size: file.size,
    mimetype: file.mimetype,
  });

  const response = {
    success: true,
    message: "File uploaded successfully",
    data: tree,
    file: file,
  };

  console.log(response);

  res.json(response);
});

// API to search for a file
app.get("/search", (req, res) => {
  const key = req.query.key;
  const result = tree.search(key);
  if (result) {
    res.json({ success: true, data: result });
  } else {
    res.json({ success: false, message: "File not found" });
  }
});

app.get("/show-tree", (req, res) => {
  res.json({ success: true, data: tree.toJSON() });
});

app.listen(3001, () => console.log("Backend running on port 3001"));
