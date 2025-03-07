const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");

// Ensure uploads directory exists
const fs = require("fs");
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Save to uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);  // Unique filename
  },
});

const upload = multer({ storage });

// Route to handle file upload
router.post("/upload", upload.single("mriScan"), (req, res) => {
  if (req.file) {
    res.json({
      message: "File uploaded successfully!",
      filePath: req.file.path,
    });
  } else {
    res.status(400).json({ message: "Failed to upload file!" });
  }
});

module.exports = router;
