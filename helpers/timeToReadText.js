const averageReadRate = 275;

function calculate(wordCount, readingSpeed = 0) {
	const timeToRead = wordCount / averageReadRate;
	return timeToRead + (timeToRead / 100) * readingSpeed;
}

module.exports = {
	calculate
};
