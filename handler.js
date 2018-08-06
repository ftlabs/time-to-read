"use strict";
require("dotenv").config();
const timeToReadModule = require("./helpers/timeToRead");
const timeNormalizer = require("./helpers/timeNormalizer");
const article = require("./helpers/article");

module.exports.main = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  let text = data.input === undefined ? "" : data.input;

  if (data.uuid) {
    try {
      const articleText = await article.getArticleText(data.uuid);
      text = `${text} ${articleText}`;
    } catch (error) {}
  }

  const wordCount = text.split(" ").length;
  let timeToRead = timeToReadModule.inMinutes(wordCount, data.readingSpeed);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      minutes: timeToRead,
      normalized: timeNormalizer.minute(timeToRead),
      input: event
    })
  };

  callback(null, response);
};
