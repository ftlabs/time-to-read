function calculate(imageCounts) {
	return inSeconds(imageCounts) / 60;
}

function inSeconds(imageCounts) {
	return imageCounts
		.map(count => {
			let total = 0;
			let timeForImage = 12;

			for (let i = 0; i < count; i++) {
				total = total + timeForImage;
				if (timeForImage !== 3) timeForImage = timeForImage - 1;
			}
			return total;
		})
		.reduce((a, b) => a + b, 0);
}
module.exports = { calculate };
