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
const sectionLines = (pointsX, pointsY, r, num_spokes) => {
  let string = `M ${pointsX[0]} ${pointsY[0]} `
  string += `A ${r} ${r} 0 ${num_spokes === 1 ? 1 : 0} 1 ${pointsX[1]} ${pointsY[1]} `
  for (let i = 2; i < pointsX.length; i++) {
    string += `L ${pointsX[i]} ${pointsY[i]} `
  }
  string += "Z "
  return string
}

export default ({x, y, os, id, angle, num_spokes, gap, ...rest}) => {
  const ir = id / 2
  const or = os / 2

  const halfGap = gap/2
  
  // const halfGapRadius = Math.sqrt((ir*ir) - (halfGap*halfGap))
  const halfGapRad = Math.asin(halfGap/ir)
  // const halfGapRad = radFromSides(ir, halfGapRadius, halfGap)
  // const halfGapRad = (halfGap / (Math.PI * ir)) * Math.PI

  const outCornerDistance = squareCenterToEdge(Math.PI / 4, os)
  const startRad = angle * Math.PI / 180
  const segmentRad = num_spokes ? pi2 / num_spokes : 0
  
  const sections = []
  const points = []
  for (let i = 0; i < num_spokes; i++) { //place inner point and outer point, then any needed corners, then last two points and draw
    let rad, inX1, inY1, inX2, inY2, outX1, outY1, outX2, outY2, halfGapDistance
    const pointsX = [], pointsY = []

    // Get first inner point
    const innerRad1 = startRad
                    + segmentRad * i
                    + halfGapRad
                    % pi2
    inX1 = x + ir * Math.cos(innerRad1)
    inY1 = y + ir * Math.sin(innerRad1)

    // Get 'first' outer gap point
    rad = startRad
        + segmentRad * i
        % pi2
    outX2 = x + squareCenterToEdge(rad, os) * Math.cos(rad)
    outY2 = y + squareCenterToEdge(rad, os) * Math.sin(rad)

    // Get distance to move, which depends on angle and gap; skewed gap needs longer x or y distance
    halfGapDistance = squareCenterToEdge(rad, gap)

    // Move 'first' points for gap, way to move (on outer) depends on what side you're on
    const startSide = radSide(rad)
    if (startSide === "right") {
      outY2 += halfGapDistance
    }
    else if (startSide === "top") {
      outX2 -= halfGapDistance
    }
    else if (startSide === "left") {
      outY2 -= halfGapDistance
    }
    else if (startSide === "bottom") {
      outX2 += halfGapDistance
    }

    // Wrap around edges
    if (outY2 > y + or) {
      outX2 -= outY2 - (y + or)
      outY2 = y + or
    }
    if (outX2 < x - or) {
      outY2 -= (x - or) - outX2
      outX2 = x - or
    }
    if (outY2 < y - or) {
      outX2 += (y - or) - outY2
      outY2 = y - or
    }
    if (outX2 > x + or) {
      outY2 += outX2 - (x + or)
      outX2 = x + or
    }

    // Get first inner point
    const innerRad2 = startRad
                    + segmentRad * (i + 1)
                    - halfGapRad
                    % pi2
    inX2 = x + ir * Math.cos(innerRad2)
    inY2 = y + ir * Math.sin(innerRad2)

    // Get 'second' outer gap point
    rad = startRad
        + segmentRad * (i + 1)
        % pi2
    outX1 = x + squareCenterToEdge(rad, os) * Math.cos(rad)
    outY1 = y + squareCenterToEdge(rad, os) * Math.sin(rad)

    // Get distance to move, which depends on angle and gap; skewed gap needs longer x or y distance
    halfGapDistance = squareCenterToEdge(rad, gap)

    // Move 'second' points for gap, way to move depends on what side you're on
    let endSide = radSide(rad)
    if (endSide === "right") {
      outY1 -= halfGapDistance
    }
    else if (endSide === "top") {
      outX1 += halfGapDistance
    }
    else if (endSide === "left") {
      outY1 += halfGapDistance
    }
    else if (endSide === "bottom") {
      outX1 -= halfGapDistance
    }

    // Wrap around edges
    if (outY1 < y - or) {
      outX1 -= (y - or) - outY1
      outY1 = y - or
    }
    if (outX1 > x + or) {
      outY1 -= outX1 - (x + or)
      outX1 = x + or
    }
    if (outY1 > y + or) {
      outX1 +=  outY1 - (y + or)
      outY1 = y + or
    }
    if (outX1 < x - or) {
      outY1 += (x - or) - outX1 
      outX1 = x - or
    }
    
    // Get side of moved point to determine how many corner points to add
    let endRad = (pi2 + Math.atan2(outY1 - y, outX1 - x)) % pi2
    endSide = (radSide(endRad))

    pointsX.push(inX1)
    pointsY.push(inY1)
    pointsX.push(inX2)
    pointsY.push(inY2)
    pointsX.push(outX1)
    pointsY.push(outY1)

    //////////////////////////////////
    // Push outer corners if needed //
    //////////////////////////////////
    if (startSide === "right") { ///////////////////////////////////////////////////////////////
      if (num_spokes === 1 && endSide === "right" && lowerOnRightSide(startRad, endRad)) {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
      }
      else if (endSide === "bottom") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
      }
      else if (endSide === "left") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
      }
      else if (endSide === "top") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
      }
    }
    else if (startSide === "bottom") { ///////////////////////////////////////////////////////
      if (num_spokes === 1 && endSide === "bottom" && startRad > endRad) {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
      }
      else if (endSide === "left") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
      }
      else if (endSide === "top") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
      }
      else if (endSide === "right") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
      }
    }
    else if (startSide === "left") { /////////////////////////////////////////////////////////
      if (num_spokes === 1 && endSide === "left" && startRad > endRad) {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
      }
      else if (endSide === "top") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
      }
      else if (endSide === "right") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
      }
      else if (endSide === "bottom") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
      }
    }
    else if (startSide === "top") { //////////////////////////////////////////////////////////
      if (num_spokes === 1 && endSide === "top" && startRad > endRad) {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
      }
      else if (endSide === "right") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.75))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
      }
      else if (endSide === "bottom") {
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 1.25))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 1.25))
        pointsX.push(x + outCornerDistance * Math.cos(Math.PI * 0.75))
        pointsY.push(y + outCornerDistance * Math.sin(Math.PI * 0.75))
      }
      else if (endSide === "left") {
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
  
  for (const section of sections) {
    for (let i = 0; i < section[0].length; i++) {
      points.push([section[0][i], section[1][i]])
    }
  }

  return <path points={JSON.stringify(points)} {...rest} d={sections.reduce((acc, [pointsX, pointsY]) => `${acc}
    ${sectionLines(pointsX, pointsY, ir, num_spokes)}`
  , ``)}/>
}