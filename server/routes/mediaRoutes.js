const express = require("express");
const { upload } = require("../config/cloudinary"); 
const { uploadMedia, getMedia, deleteMedia, updateMedia } = require("../controllers/mediaController");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadMedia);
router.get("/", getMedia);
router.put("/:id", upload.single("file"), updateMedia);

router.delete("/:id", deleteMedia);

module.exports = router;