const express = require("express");
const { upload } = require("../config/cloudinary"); 
const { getProjects, createProject, updateProject, deleteProject } = require("../controllers/projectController");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get("/", getProjects);

router.post(
  "/",
  verifyToken,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "brochure", maxCount: 1 }
  ]),
  createProject
);

router.put(
  "/:id",
  verifyToken,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "brochure", maxCount: 1 },
  ]),
  updateProject
);

router.delete("/:id",verifyToken, deleteProject);

module.exports = router;
