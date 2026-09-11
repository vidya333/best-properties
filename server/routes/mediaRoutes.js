const express = require("express");
const { upload } = require("../config/cloudinary"); 
const { uploadMedia, getMedia, deleteMedia, updateMedia } = require("../controllers/mediaController");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get("/", getMedia);
router.post("/upload",verifyToken, upload.single("file"), uploadMedia);
router.put("/:id",verifyToken, upload.single("file"), updateMedia);
router.delete("/:id",verifyToken, deleteMedia);

module.exports = router;