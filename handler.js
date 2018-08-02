"use strict";
const timeToReadModule = require("./helpers/timeToRead");
const timeNormalizer = require("./helpers/timeNormalizer");

module.exports.main = (event, context, callback) => {
  const text = JSON.parse(event.body).input;
  const wordCount = text.split(" ").length;
  const timeToRead = timeToReadModule.inMinutes(wordCount);
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
