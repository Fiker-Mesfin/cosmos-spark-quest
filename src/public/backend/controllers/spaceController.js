const content = require("../services/contentService");

exports.getSpaceObject = async (req, res) => {
  try {
    const data = await content.getContent(req.params.name);

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
