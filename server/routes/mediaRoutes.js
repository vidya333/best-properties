const express = require("express");
const { upload } = require("../config/cloudinary"); 
const { uploadMedia, getMedia, deleteMedia } = require("../controllers/mediaController");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadMedia);

router.get("/", getMedia);
router.delete("/:id", deleteMedia);

module.exports = router;
