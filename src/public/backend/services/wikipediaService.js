const axios = require("axios");

async function getWikipedia(topic) {
  try {
    const response = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        prop: "extracts|pageimages",
        explaintext: true,
        exintro: true,
        redirects: 1,
        titles: topic,
        format: "json",
        pithumbsize: 800,
        origin: "*",
      },
      headers: {
        "User-Agent": "CosmosSparkQuest/1.0",
      },
    });

    const pages = response.data.query.pages;

    const page = Object.values(pages)[0];

    return {
      title: page.title,

      description: page.extract,

      thumbnail: page.thumbnail?.source || null,
    };
  } catch (err) {
    return {
      title: topic,

      description: "",

      thumbnail: null,
    };
  }
}

module.exports = { getWikipedia };
