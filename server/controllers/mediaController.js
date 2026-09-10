const Media = require("../models/Media");

// UPLOAD Media (Cloudinary Updated)
exports.uploadMedia = async (req, res) => {
  try {
    const fileType = req.file.mimetype.startsWith("video") ? "video" : "image";
    const { category, title, description } = req.body;

    const newMedia = new Media({
      type: fileType,
      src: req.file.path, // Cloudinary URL
      category: category || "flats-locations",
      title: title || "",
      description: description || ""
    });

    await newMedia.save();
    res.status(201).json(newMedia);
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// FETCH all media (can filter by category via query ?category=client-stories)
exports.getMedia = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category !== "all") {
      query.category = category;
    }
    const media = await Media.find(query).sort({ createdAt: -1 });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE media
exports.updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const oldMedia = await Media.findById(id);
    if (!oldMedia) {
      return res.status(404).json({ message: "Media not found" });
    }

    const { category, title, description } = req.body;
    
    // If a new file is uploaded, use its path; otherwise, keep the old src
    let updatedSrc = oldMedia.src;
    let updatedType = oldMedia.type;

    if (req.file) {
      updatedSrc = req.file.path;
      updatedType = req.file.mimetype.startsWith("video") ? "video" : "image";
    }

    const updatedMedia = await Media.findByIdAndUpdate(
      id,
      {
        type: updatedType,
        src: updatedSrc,
        category: category || oldMedia.category,
        title: title !== undefined ? title : oldMedia.title,
        description: description !== undefined ? description : oldMedia.description
      },
      { new: true }
    );

    res.json(updatedMedia);
  } catch (error) {
    console.error("Cloudinary Update Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE media
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }
    res.json({ message: "Media deleted successfully from database", id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};