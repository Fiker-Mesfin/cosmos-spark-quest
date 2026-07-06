const wiki = require("./wikipediaService");
const nasa = require("./nasaService");
const youtube = require("./youtubeService");
const parser = require("./parserService");

async function getContent(topic) {
  const wikipedia = await wiki.getWikipedia(topic);

  const images = await nasa.getNASAImages(topic);

  const videos = await youtube.getYoutubeVideos(topic);

  const description = parser.cleanText(wikipedia.description);

  const paragraphs = parser.splitIntoParagraphs(description);

  const facts = parser.generateFacts(description);

  return {
    title: wikipedia.title,

    thumbnail: wikipedia.thumbnail,

    overview: paragraphs[0] || "",

    details: paragraphs,

    interestingFacts: facts,

    images,

    videos,
  };
}

module.exports = {
  getContent,
};
