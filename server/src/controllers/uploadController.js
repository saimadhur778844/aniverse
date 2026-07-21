export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    res.status(200).json({
      imageUrl: req.file.path,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};