import React from "react"

const pi2 = Math.PI * 2
const squareCenterToEdge = (rad, edge) => {
  const halfEdge = edge/2
  const radToUse = rad % (Math.PI / 2)
  if (radToUse <= Math.PI / 4) {
    return halfEdge / Math.cos(radToUse)
  } else {
    return halfEdge / Math.sin(radToUse)
  }
}
const radSide = radian => {
  const modRad = radian % pi2
  if (modRad >= Math.PI * 0.25 && modRad < Math.PI * 0.75 ) return "top"
  if (modRad >= Math.PI * 0.75 && modRad < Math.PI * 1.25 ) return "left"
  if (modRad >= Math.PI * 1.25 && modRad < Math.PI * 1.75 ) return "bottom"
  return "right"
}
const lowerOnRightSide = (rad1, rad2) => {
  const mod1 = rad1 % pi2
  const mod2 = rad2 % pi2
  if (mod2 < mod1) return true
  if (mod2 >= Math.PI * 1.75 && mod1 <= Math.PI * 0.25) return true
  return false
}
const sectionLines = (pointsX, pointsY) => {
  let string = `M ${pointsX[pointsX.length-1]} ${pointsY[pointsY.length-1]} `
  for (let i = 0; i < pointsX.length; i++) {
    string = `${string}L ${pointsX[i]} ${pointsY[i]}`
  }
  return string
}

export default ({x, y, os, is, angle, num_spokes, gap}) => {
  const halfIn = is / 2
  const halfOut = os / 2
  const inCornerDistance = squareCenterToEdge(Math.PI / 4, is)
  const outCornerDistance = squareCenterToEdge(Math.PI / 4, os)
  const startRad = angle * Math.PI / 180
  const segmentRad = num_spokes ? (pi2) / num_spokes : 0

  const sections = []
  for (let i = 0; i < num_spokes; i++) {
    let rad, inX1, inY1, inX2, inY2, outX1, outY1, outX2, outY2, halfGapDistance
    const pointsX = [], pointsY = []

    // Get first inner gap point
    rad = startRad
        + segmentRad * i
        % pi2
    inX1 = x + squareCenterToEdge(rad, is) * Math.cos(rad)
    inY1 = y + squareCenterToEdge(rad, is) * Math.sin(rad)
    outX2 = x + squareCenterToEdge(rad, os) * Math.cos(rad)
    outY2 = y + squareCenterToEdge(rad, os) * Math.sin(rad)

    // Get distance to move, which depends on angle and gap; skewed gap needs longer x or y distance
    halfGapDistance = squareCenterToEdge(rad, gap)

    // Move 'first' points for gap, way to move depends on what side you're on
    let startSide = radSide(rad)
    if (startSide === "right") {
      inY1 += halfGapDistance
      outY2 += halfGapDistance
    }
    else if (startSide === "top") {
      inX1 -= halfGapDistance
      outX2 -= halfGapDistance
    }
    else if (startSide === "left") {
      inY1 -= halfGapDistance
      outY2 -= halfGapDistance
    }
    else if (startSide === "bottom") {
      inX1 += halfGapDistance
      outX2 += halfGapDistance
    }
    
    // Wrap around edges
    if (inY1 > y + halfIn) {
      inX1 -= inY1 - (y + halfIn)
      inY1 = y + halfIn
    }
    if (outY2 > y + halfOut) {
      outX2 -= outY2 - (y + halfOut)
      outY2 = y + halfOut
    }
    if (inX1 < x - halfIn) {
      inY1 -= (x - halfIn) - inX1
      inX1 = x - halfIn
    }
    if (outX2 < x - halfOut) {
      outY2 -= (x - halfOut) - outX2
      outX2 = x - halfOut
    }
    if (inY1 < y - halfIn) {
      inX1 += (y - halfIn) - inY1
      inY1 = y - halfIn
    }
    if (outY2 < y - halfOut) {
      outX2 += (y - halfOut) - outY2
      outY2 = y - halfOut
    }
    if (inX1 > x + halfIn) {
      inY1 += inX1 - (x + halfIn)
      inX1 = x + halfIn
    }
    if (outX2 > x + halfOut) {
      outY2 += outX2 - (x + halfOut)
      outX2 = x + halfOut
    }

    // Get side of moved point to determine how many corner points to add
    let startInRad = (pi2 + Math.atan2(inY1 - y, inX1 - x)) % pi2
    let startOutRad = (pi2 + Math.atan2(outY2 - y, outX2 - x)) % pi2
    let startInSide = radSide(startInRad)
    let startOutSide = radSide(startOutRad)

    // Get second inner and outer gap points
    rad = startRad
        + segmentRad * (i + 1)
        % pi2
    inX2 = x + squareCenterToEdge(rad, is) * Math.cos(rad)
    inY2 = y + squareCenterToEdge(rad, is) * Math.sin(rad)
    outX1 = x + squareCenterToEdge(rad, os) * Math.cos(rad)
    outY1 = y + squareCenterToEdge(rad, os) * Math.sin(rad)

    // Get distance to move, which depends on angle and gap; skewed gap needs longer x or y distance
    halfGapDistance = squareCenterToEdge(rad, gap)
    
    // Move 'second' points for gap, way to move depends on what side you're on
    let endSide = radSide(rad)
    if (endSide === "right") {
      inY2 -= halfGapDistance
      outY1 -= halfGapDistance
    }
    else if (endSide === "top") {
      inX2 += halfGapDistance
      outX1 += halfGapDistance
    }
    else if (endSide === "left") {
      inY2 += halfGapDistance
      outY1 += halfGapDistance
    }
    else if (endSide === "bottom") {
      inX2 -= halfGapDistance
      outX1 -= halfGapDistance
    }
    
    // Wrap around edges
    if (inY2 < y - halfIn) {
      inX2 -= (y - halfIn) - inY2
      inY2 = y - halfIn
    }
    if (outY1 < y - halfOut) {
      outX1 -= (y - halfOut) - outY1
      outY1 = y - halfOut
    }
    if (inX2 > x + halfIn) {
      inY2 -= inX2 - (x + halfIn)
      inX2 = x + halfIn
    }
    if (outX1 > x + halfOut) {
      outY1 -= outX1 - (x + halfOut)
      outX1 = x + halfOut
    }
    if (inY2 > y + halfIn) {
      inX2 +=  inY2 - (y + halfIn)
      inY2 = y + halfIn
    }
    if (outY1 > y + halfOut) {
      outX1 +=  outY1 - (y + halfOut)
      outY1 = y + halfOut
    }
    if (inX2 < x - halfIn) {
      inY2 += (x - halfIn) - inX2 
      inX2 = x - halfIn
    }
    if (outX1 < x - halfOut) {
      outY1 += (x - halfOut) - outX1 
      outX1 = x - halfOut
    }
    
    // Get side of moved point to determine how many corner points to add
    let endInRad = (pi2 + Math.atan2(inY2 - y, inX2 - x)) % pi2
    let endOutRad = (pi2 + Math.atan2(outY1 - y, outX1 - x)) % pi2
    let endInSide = (radSide(endInRad))
    let endOutSide = (radSide(endOutRad))

    pointsX.push(inX1)
    pointsY.push(inY1)
    //////////////////////////////////
    // Push inner corners if needed //
    if (startInSide === "right") {  ////////////////////////////////////////////////////////////
      if (num_spokes === 1 && endInSide === "right" && lowerOnRightSide(startInRad, endInRad )) {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.75))
      }
      else if (endInSide === "bottom") {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.25))
      }
      else if (endInSide === "left") {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.75))
      }
      else if (endInSide === "top") {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.25))
      }
    }
    else if (startInSide === "bottom") { ///////////////////////////////////////////////////////
      if (num_spokes === 1 && endInSide === "bottom" && startInRad > endInRad) {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.25))
      }
      else if (endInSide === "left") {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.75))
      }
      else if (endInSide === "top") {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.25))
      }
      else if (endInSide === "right") {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.75))
      }
    }
    else if (startInSide === "left") { /////////////////////////////////////////////////////////
      if (num_spokes === 1 && endInSide === "left" && startInRad > endInRad) {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.75))
      }
      else if (endInSide === "top") {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.25))
      }
      else if (endInSide === "right") {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.75))
      }
      else if (endInSide === "bottom") {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.25))
      }
    }
    else if (startInSide === "top") { //////////////////////////////////////////////////////////
      if (num_spokes === 1 && endInSide === "top" && startInRad > endInRad) {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.25))
      }
      else if (endInSide === "right") {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.75))
      }
      else if (endInSide === "bottom") {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 1.25))
      }
      else if (endInSide === "left") {
        pointsX.push(x + inCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + inCornerDistance * Math.sin(Math.PI * 0.75))
      }
    } //////////////////////////////////////////////////////////////////////////////////////////

    // Push second inner and first outer points
    pointsX.push(inX2)
    pointsY.push(inY2)
    pointsX.push(outX1)
    pointsY.push(outY1)

    //////////////////////////////////
    // Push outer corners if needed //
    //////////////////////////////////
    if (startOutSide === "right") { ////////////////////////////////////////////////////////////
      if (num_spokes === 1 && endOutSide === "right" && lowerOnRightSide(startOutRad, endOutRad)) {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
      }
      else if (endOutSide === "bottom") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
      }
      else if (endOutSide === "left") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
      }
      else if (endOutSide === "top") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
      }
    }
    else if (startOutSide === "bottom") { ///////////////////////////////////////////////////////
      if (num_spokes === 1 && endOutSide === "bottom" && startOutRad > endOutRad) {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
      }
      else if (endOutSide === "left") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
      }
      else if (endOutSide === "top") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
      }
      else if (endOutSide === "right") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
      }
    }
    else if (startOutSide === "left") { /////////////////////////////////////////////////////////
      if (num_spokes === 1 && endOutSide === "left" && startOutRad > endOutRad) {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
      }
      else if (endOutSide === "top") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
      }
      else if (endOutSide === "right") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
      }
      else if (endOutSide === "bottom") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
      }
    }
    else if (startOutSide === "top") { //////////////////////////////////////////////////////////
      if (num_spokes === 1 && endOutSide === "top" && startOutRad > endOutRad) {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
      }
      else if (endOutSide === "right") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
      }
      else if (endOutSide === "bottom") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
      }
      else if (endOutSide === "left") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
      }
    } //////////////////////////////////////////////////////////////////////////////////////////

    // Push last outer end points
    pointsX.push(outX2)
    pointsY.push(outY2)

    // Push entire section as tuple
    sections.push([pointsX, pointsY])
  }

  return <path d={sections.reduce((acc, [pointsX, pointsY]) => `${acc}
    ${sectionLines(pointsX, pointsY)}
  `, ``)}/>
}