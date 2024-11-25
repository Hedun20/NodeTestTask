const express = require("express");
const multer = require("multer");
const {
  getProfile,
  updateProfile,
  uploadAvatar,
} = require("../controllers/profileController");

const router = express.Router();

// Настройка загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads/avatars/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Invalid file type"));
  },
});

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

module.exports = router;
