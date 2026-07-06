const axios = require("axios");

const API_KEY = process.env.YOUTUBE_API_KEY;

async function getYoutubeVideos(topic) {
  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        key: API_KEY,
        part: "snippet",
        q: `${topic} NASA documentary`,
        maxResults: 4,
        type: "video",
        videoEmbeddable: true,
        safeSearch: "strict",
      },
    });

    return response.data.items.map((item) => ({
      title: item.snippet.title,
      youtubeId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.high.url,
      channel: item.snippet.channelTitle,
    }));
  } catch (err) {
    console.error(err.message);
    return [];
  }
}

module.exports = {
  getYoutubeVideos,
};
