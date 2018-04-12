function leadingZeroes (num, places) {
  const zero = places - num.toString().length
  return '0'.repeat(zero >= 0 ? zero : 0) + num
}

module.exports = {
  leadingZeroes,
}
