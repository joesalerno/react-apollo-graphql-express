module.exports = (p1, p2) => {
  let x = p2[0] - p1[0]
  let y = p2[1] - p1[1]
  return {d: Math.sqrt(Math.abs(x * x) + Math.abs(y * y)), x, y}
}