function cleanText(text = "") {
  return text
    .replace(/\s+/g, " ")
    .replace(/\[[^\]]*\]/g, "")
    .trim();
}

function splitIntoParagraphs(text = "") {
  return text
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 40);
}

function generateFacts(text = "") {
  const sentences = text
    .split(". ")
    .map((s) => s.trim())
    .filter((s) => s.length > 40);

  return sentences.slice(0, 8);
}

module.exports = {
  cleanText,
  splitIntoParagraphs,
  generateFacts,
};
