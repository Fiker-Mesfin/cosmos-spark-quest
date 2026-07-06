const axios = require("axios");

async function getNASAImages(topic) {
  try {
    const searchQuery = `${topic} planet`;

    const response = await axios.get("https://images-api.nasa.gov/search", {
      params: {
        q: searchQuery,
        media_type: "image",
      },
    });

    const images = response.data.collection.items
      .filter((item) => {
        const title = item.data?.[0]?.title?.toLowerCase() || "";
        return !title.includes("celebration");
      })
      .slice(0, 12);

    return images;
  } catch (err) {
    return [];
  }
}

module.exports = { getNASAImages };
