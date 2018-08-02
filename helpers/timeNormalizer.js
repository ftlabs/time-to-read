function minute(minutes) {
  if (minutes < 1) {
    return secondResult(minutes);
  }
  return minuteResult(minutes);
}

function secondResult(minutes) {
  const secondsRounded = Math.ceil((minutes * 60) / 10) * 10;
  if (secondsRounded === 60) return minuteResult(1);
  return `${secondsRounded} second${determinePlural(secondsRounded)}`;
}

function minuteResult(minutes) {
  const minutesRounded = Math.ceil(minutes);
  return `${minutesRounded} minute${determinePlural(minutesRounded)}`;
}

function determinePlural(number) {
  return number === 1 ? "" : "s";
}

module.exports = { minute };
