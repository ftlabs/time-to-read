'use strict';
require('dotenv').config();
const timeToReadText = require('./helpers/timeToReadText');
const timeToReadImages = require('./helpers/timeToReadImages');
const timeNormalizer = require('./helpers/timeNormalizer');
const article = require('./helpers/article');

module.exports.main = async (event, context, callback) => {
	const data = JSON.parse(event.body);

	if (typeof data.textInput === 'array') data.textInput.join(' ');
	let text = data.textInput || '';
	const articles = data.articles || [];

	Promise.all(articles.map(uuid => article.getArticleText(uuid)))
		.then(results => {
			text = `${text} ${results.map(result => result.text).join(' ')}`;
			const wordCount = text.split(' ').length;
			const imageTime = timeToReadImages.calculate(
				results.map(result => result.imageCount)
			);
			let textTime = timeToReadText.calculate(wordCount, data.readingSpeed);

			let totalTimeToRead = textTime + imageTime;

			const response = {
				statusCode: 200,
				body: JSON.stringify({
					minutes: totalTimeToRead,
					normalized: timeNormalizer.minute(totalTimeToRead),
					input: event
				})
			};
			console.log(response);

			callback(null, response);
		})
		.catch(error => {
			const response = {
				statusCode: 500,
				error
			};
			console.log(response);
			callback(null, response);
		});
};
