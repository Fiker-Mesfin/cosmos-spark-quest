const objects = require("../data/objects");

exports.getObjects = async (req, res) => {
  try {
    const results = objects.map((obj) => ({
      ...obj,

      thumbnail: `https://images-assets.nasa.gov/image/${obj.slug}/${obj.slug}~thumb.jpg`,
    }));

    res.json(results);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
