module.exports = time => {
  const a = new Date(parseInt(time))
  return a.toDateString()
}