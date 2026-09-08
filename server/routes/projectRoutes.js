const express = require("express");
const { upload } = require("../config/cloudinary"); 
const { getProjects, createProject, updateProject, deleteProject } = require("../controllers/projectController");

const router = express.Router();

router.get("/", getProjects);

router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "brochure", maxCount: 1 }
  ]),
  createProject
);

router.put(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "brochure", maxCount: 1 },
  ]),
  updateProject
);

router.delete("/:id", deleteProject);

module.exports = router;
