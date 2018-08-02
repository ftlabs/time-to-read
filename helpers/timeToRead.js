const averageReadRate = 275;

function inMinutes(wordCount) {
  return wordCount / averageReadRate;
}

module.exports = {
  inMinutes
};
