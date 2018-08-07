"use strict";
require("dotenv").config();
const timeToReadModule = require("./helpers/timeToRead");
const timeNormalizer = require("./helpers/timeNormalizer");
const article = require("./helpers/article");

module.exports.main = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (typeof data.textInput === "array") data.textInput.join(" ");
  let text = data.textInput || "";
  const articles = data.articles || [];

  Promise.all(articles.map(uuid => article.getArticleText(uuid)))
    .then(results => {
      text = `${text} ${results.join(" ")}`;
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
    })
    .catch(error => {
      const response = {
        statusCode: 500,
        error
      };
      callback(null, response);
    });
};
