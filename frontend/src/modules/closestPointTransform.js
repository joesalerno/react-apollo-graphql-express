// copied from https://bl.ocks.org/mbostock/8027637
// modified for matrix transformation
module.exports = (pathNode, point, transform) => {  
  var pathLength = pathNode.getTotalLength()
  // var precision = pathLength / pathNode.pathSegList.numberOfItems * .125
  var precision = 6
  var best
  var bestLength
  var bestDistance = Infinity

  // linear scan for coarse approximation
  for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
    scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength).matrixTransform(transform))
    if (scanDistance < bestDistance) {
      best = scan
      bestLength = scanLength
      bestDistance = scanDistance
    }
  }
  // binary search for precise estimate
  precision /= 2
  while (precision > 0.5) {
    var before
    var after
    var beforeLength
    var afterLength
    var beforeDistance
    var afterDistance
    if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength).matrixTransform(transform))) < bestDistance) {
      best = before
      bestLength = beforeLength
      bestDistance = beforeDistance
    } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength).matrixTransform(transform))) < bestDistance) {
      best = after
      bestLength = afterLength
      bestDistance = afterDistance
    } else {
      precision /= 2
    }
  }
  if (!best) return
  best = [best.x, best.y]
  best.distance = Math.sqrt(bestDistance)
  return best

  function distance2(p) {
    var dx = p.x - point[0]
    var dy = p.y - point[1]
    return dx * dx + dy * dy
  }
}