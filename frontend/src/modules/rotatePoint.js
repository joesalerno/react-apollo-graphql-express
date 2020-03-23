// rotates a point x,y around center xC,yC by radian
module.exports = (radian, x, y, xC, yC) => {
  const deltaX = x - xC
  const deltaY = y - yC
  const d = Math.sqrt(deltaX*deltaX + deltaY*deltaY)
  const currentRad = Math.atan2(deltaY, deltaX)
  const newRad = (currentRad + radian) % (Math.PI * 2)
  return [x + d * Math.cos(newRad),  y + d * Math.sin(newRad)]
}