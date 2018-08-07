const averageReadRate = 275;

function inMinutes(wordCount, readingSpeed = 0) {
	const timeToRead = wordCount / averageReadRate;
	return timeToRead + (timeToRead / 100) * readingSpeed;
}

module.exports = {
	inMinutes
};
