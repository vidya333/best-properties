const Project = require("../models/Project");

// GET all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// ADD project (Cloudinary Updated)
exports.createProject = async (req, res) => {
  try {
    const { title, subtitle, description, features, whatsappNumber, email } = req.body;

    // Handle features string vs array
    let featuresArray = features;
    if (typeof features === "string") {
      featuresArray = features.split(",").map(f => f.trim());
    }

    // Use .path for Cloudinary URLs (multiple images)
    const imagePaths = req.files && req.files["images"]
      ? req.files["images"].map(file => file.path) 
      : [];

    // Use .path for Cloudinary URL (single brochure)
    const brochurePath = req.files && req.files["brochure"]
      ? req.files["brochure"][0].path 
      : null;

    const newProject = new Project({
      title,
      subtitle,
      description,
      features: featuresArray,
      images: imagePaths,
      brochure: brochurePath,
      whatsappNumber,
      email,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Cloudinary Upload Error Details:", error.stack || error.message || JSON.stringify(error));
    res.status(500).json({ message: "Error creating project", error: error.message || String(error) });
  }
};

// UPDATE project (Cloudinary Updated)
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description, features, whatsappNumber, email } = req.body;

    let featuresArray = features;
    if (typeof features === "string") {
      featuresArray = features.split(",").map(f => f.trim());
    }

    // Handle updated images from Cloudinary
    const imagePaths = req.files && req.files["images"]
      ? req.files["images"].map(file => file.path)
      : undefined;

    const brochurePath = req.files && req.files["brochure"]
      ? req.files["brochure"][0].path
      : undefined;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        description,
        features: featuresArray,
        ...(imagePaths ? { images: imagePaths } : {}),
        ...(brochurePath ? { brochure: brochurePath } : {}),
        whatsappNumber,
        email,
      },
      { new: true }
    );

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating project" });
  }
};

// DELETE project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    // Note: This deletes the record from MongoDB. 
    // To delete files from Cloudinary too, you would use cloudinary.uploader.destroy()
    await Project.findByIdAndDelete(id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting project" });
  }
};
