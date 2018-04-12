function getRandomInt (min, max) {
  return parseInt(Math.floor(Math.random() * (max - min + 1)) + min, 10)
}

module.exports = {
  getRandomInt,
}
