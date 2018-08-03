"use strict";
const timeToReadModule = require("./helpers/timeToRead");
const timeNormalizer = require("./helpers/timeNormalizer");

module.exports.main = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const text = data.input;

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
