import React, { useRef, useEffect } from "react"
import validOdbSymbol from "../modules/validOdbSymbol"
const pi2 = Math.PI * 2
const degreeToRadian = degree => degree * Math.PI / 180
const radToDegree = radian => radian * 180 / Math.PI
const sq = n => n * n
const degreeFromSides = (a, b, opposite) => {
  if (!a || !b) return 0
  return 180 * Math.acos( (sq(opposite) -sq(a) -sq(b))/( -2*a*b ) ) /Math.PI
}
const radFromSides = (a, b, opposite) => {
  if (!a || !b) return 0
  return Math.acos( (sq(opposite) -sq(a) -sq(b))/( -2*a*b ) )
}
const squareCenterToEdge = (rad, edge) => {
  const halfEdge = edge/2
  const radToUse = rad % (Math.PI / 2)
  if (radToUse <= Math.PI / 4) {
    return halfEdge / Math.cos(radToUse)
  } else {
    return halfEdge / Math.sin(radToUse)
  }
}
const squareCenterToEdgeDegrees = ({degree, edge}) => {
  const halfEdge = edge/2
  let angleToUse = degree % 90 // 4 quadrants calculated the same
  if (angleToUse <= 45) { // Use distance in X
    return halfEdge / Math.cos(degreeToRadian(angleToUse))
  } else { // Use distance in Y
    return halfEdge / Math.sin(degreeToRadian(angleToUse))
  }
}
const degreeSide = degree => {
  if (degree >= 45 && degree < 135 ) return "top"
  if (degree >= 135 && degree < 225 ) return "left"
  if (degree >= 225 && degree < 315 ) return "bottom"
  return "right"
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

export default ({heightPx, widthPx, features}) => {
  const canvasRef = useRef(null)

  const drawPad = ({ symbol, x, y, polarity, rotation, resize, fillStyle }) => {
    const ctx = canvasRef.current.getContext("2d")

    const type = validOdbSymbol(symbol)
    if (!type) return console.log({ParsingError: {symbol, x, y, polarity, rotation, resize}})

    const getParams = () => symbol.match(/[0-9]+(\.[0-9]*)?/g).map(text => parseFloat(text))

    const rotate = ({x, y, degrees}) => {
      ctx.translate(x,y)
      ctx.rotate(degreeToRadian(degrees))
      ctx.translate(-x,-y)
    }

    const square = ({x, y, s}) => ctx.rect(x-s/2, y-s/2, s, s)

    const rectangle = ({x, y, w, h}) => ctx.rect(x-w/2, y-h/2, w, h)

    const circle = ({x, y, r}) => ctx.arc(x, y, r, 0, 2*Math.PI)

    const roundedRectangle = ({x, y, w, h, rad, corners}) => {
      const halfW = w / 2; const halfH = h / 2
      if (w < 2 * rad) rad = w / 2 //fix rad > h*2 or w*2
      if (h < 2 * rad) rad = h / 2
      ctx.moveTo(x+halfW, y+halfH)
      ctx.arcTo(x-halfW, y+halfH, x-halfW, y-halfH, rad)
      ctx.arcTo(x-halfW, y-halfH, x+halfW, y-halfH, rad)
      ctx.arcTo(x+halfW, y-halfH, x+halfW, y+halfH, rad)
      ctx.arcTo(x+halfW, y+halfH, x-halfW, y+halfH, rad)
    }

    const chamferedRectangle = ({x, y, w, h, rad, corners}) => {
      const halfW = w / 2; const halfH = h / 2
      if (w < 2 * rad) rad = w / 2 //fix rad > h*2 or w*2
      if (h < 2 * rad) rad = h / 2
      ctx.moveTo(x+halfW-rad, +y+halfH)
      ctx.lineTo(x+halfW,     y+halfH-rad)
      ctx.lineTo(x+halfW,     y-halfH+rad)
      ctx.lineTo(x+halfW-rad, y-halfH)
      ctx.lineTo(x-halfW+rad, y-halfH)
      ctx.lineTo(x-halfW,     y-halfH+rad)
      ctx.lineTo(x-halfW,     y+halfH-rad)
      ctx.lineTo(x-halfW+rad, y+halfH)
      ctx.lineTo(x+halfW+rad, y+halfH)
    }

    const diamond = ({x, y, w, h}) => {
      const halfW = w / 2; const halfH = h / 2
      ctx.moveTo(x-halfW, y)
      ctx.lineTo(x, y+halfH)
      ctx.lineTo(x+halfW, y)
      ctx.lineTo(x, y-halfH)
      ctx.lineTo(x-halfW, y)
    }

    const horzHexagon = ({x, y, w, h, r}) => {
      const halfW = w / 2; const halfH = h / 2
      ctx.moveTo(x+halfW, y)
      ctx.lineTo(x+halfW-r, y-halfH)
      ctx.lineTo(x-halfW+r, y-halfH)
      ctx.lineTo(x-halfW, y)
      ctx.lineTo(x-halfW+r, y+halfH)
      ctx.lineTo(x+halfW-r, y+halfH)
      ctx.lineTo(x+halfW, y)
    }

    const vertHexagon = ({x, y, w, h, r}) => {
      const halfW = w / 2; const halfH = h / 2
      ctx.moveTo(x, y+halfH)
      ctx.lineTo(x+halfW, y+halfH-r)
      ctx.lineTo(x+halfW, y-halfH+r)
      ctx.lineTo(x, y-halfH)
      ctx.lineTo(x-halfW, y-halfH+r)
      ctx.lineTo(x-halfW, y+halfH-r)
      ctx.lineTo(x, y+halfH)
    }

    const butterfly = ({x, y, d}) => {
      const r = d / 2
      ctx.moveTo(x, y+r)
      ctx.lineTo(x, y-r)
      ctx.arcTo(x+r, y-r, x+r, y, r)
      ctx.lineTo(x-r, y)
      ctx.arcTo(x-r, y+r, x, y+r, r)
    }

    const sqrButterfly = ({x, y, s}) => {
      const halfS = s / 2
      square({x: x+halfS/2, y: y-halfS/2, s: halfS})
      square({x: x-halfS/2, y: y+halfS/2, s: halfS})
    }

    const triangle = ({x, y, base, h}) => {
      const halfBase = base/2; const halfH = h/2
      ctx.moveTo(x+halfBase, y-halfH)
      ctx.lineTo(x-halfBase, y-halfH)
      ctx.lineTo(x, y+halfH)
      ctx.lineTo(x+halfBase, y-halfH)
    }

    const halfOval = ({x, y, w, h}) => {
      // todo implement when look into crazy way odb specifies corners
    }

    const roundedRoundThermal = ({x, y, od, id, angle, num_spokes, gap}) => {
      const halfLw = (od - id) / 4
      const avgR = (od + id) / 4
      const ir = id / 2
      const or = od / 2
      const startRad = degreeToRadian(angle)
      const halfGapRad = radFromSides(avgR, avgR, gap/2)
      const smallArcRad = radFromSides(avgR, avgR, halfLw)
      const segmentRad = num_spokes ? pi2 / num_spokes : 0

      const sections = []
      for (let i = 0, rad; i < num_spokes; i++) {
        const circlesX = [], circlesY = [];
        const inRads = [],   outRads = [];

        rad = startRad
            + segmentRad * i
            + halfGapRad
            + smallArcRad
        circlesX.push(x + avgR * Math.cos(rad))
        circlesY.push(y + avgR * Math.sin(rad))
        inRads.push(rad + Math.PI)
        outRads.push(rad)

        rad = startRad
            + segmentRad * (i+1)
            - halfGapRad
            - smallArcRad
        circlesX.push(x + avgR * Math.cos(rad))
        circlesY.push(y + avgR * Math.sin(rad))
        inRads.push(rad + Math.PI)
        outRads.push(rad)

        sections.push([circlesX, circlesY, inRads, outRads])
      }

      for (const [circlesX, circlesY, inRads, outRads] of sections) {
        let startingX = x + ir * Math.cos(outRads[0])
        let startingY = y + ir * Math.sin(outRads[0])
        ctx.moveTo(startingX, startingY)
        ctx.arc(circlesX[0], circlesY[0], halfLw, inRads[0], outRads[0])
        ctx.arc(x, y, ir, outRads[0], outRads[1])
        ctx.arc(circlesX[1], circlesY[1], halfLw, outRads[1], inRads[1])
        ctx.arc(x, y, or, outRads[1], outRads[0], true)
      }
    }

    const squaredRoundThermal = ({x, y, od, id, angle, num_spokes, gap}) => {
      const ir = id / 2
      const or = od / 2
      const startRad = degreeToRadian(angle)
      const innerHalfGapRad = radFromSides(ir, ir, gap / 2)
      const outerHalfGapRad = radFromSides(or, or, gap / 2)
      const segmentRad = num_spokes ? pi2 / num_spokes : 0

      const sections = []
      for (let i = 0, rad; i < num_spokes; i++) {
        const radians = [];

        rad = startRad
            + segmentRad * i
            + outerHalfGapRad
        radians.push(rad)

        rad = startRad
            + segmentRad * i
            + innerHalfGapRad
        radians.push(rad)

        rad = startRad
            + segmentRad * (i+1)
            - innerHalfGapRad
        radians.push(rad)

        rad = startRad
            + segmentRad * (i+1)
            - outerHalfGapRad
        radians.push(rad)

        sections.push(radians)
      }

      for (const radians of sections) {
        let cornerX = x + or * Math.cos(radians[0])
        let cornerY = y + or * Math.sin(radians[0])
        ctx.moveTo(cornerX, cornerY)

        cornerX = x + ir * Math.cos(radians[1])
        cornerY = y + ir * Math.sin(radians[1])
        ctx.lineTo(cornerX, cornerY)
        
        ctx.arc(x, y, ir, radians[1], radians[2])

        cornerX = x + or * Math.cos(radians[3])
        cornerY = y + or * Math.sin(radians[3])
        ctx.lineTo(cornerX, cornerY)

        ctx.arc(x, y, or, radians[3], radians[0], true)
      }
    }

    const squareThermal = ({x, y, os, is, angle, num_spokes, gap}) => {
      const halfIn = is / 2
      const halfOut = os / 2
      const inCornerDistance = squareCenterToEdge(Math.PI / 4, is)
      const outCornerDistance = squareCenterToEdge(Math.PI / 4, os)
      const startRad = degreeToRadian(angle)
      const segmentRad = num_spokes ? pi2 / num_spokes : 0
      
      for (let i = 0; i < num_spokes; i++) { //place any needed corners, then inner point and outer point, then any needed corners, then last two points and draw
        let rad, inX1, inY1, inX2, inY2, outX1, outY1, outX2, outY2, halfGapDistance
        const pointsX = [], pointsY = [];

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

        // Draw it!
        ctx.moveTo(pointsX[pointsX.length-1], pointsY[pointsY.length-1])
        for (let i = 0; i < pointsX.length; i++) {
          ctx.lineTo(pointsX[i], pointsY[i])
        }
      }
    }

    const squareThermalOpenCorners = ({x, y, od, id, angle, num_spokes, gap}) => {
      const halfIn = id / 2
      const halfOut = od / 2
      const startRad = degreeToRadian(angle)
      const segmentRad = num_spokes ? pi2 / num_spokes : 0

      for (let i = 0; i < num_spokes; i++) { //place any needed corners, then inner point and outer point, then any needed corners, then last two points and draw
        let rad, inX1, inY1, inX2, inY2, outX1, outY1, outX2, outY2, halfGapDistance

        // Get first inner gap point
        rad = startRad
            + segmentRad * i
            % pi2
        inX1 = x + squareCenterToEdge(rad, id) * Math.cos(rad)
        inY1 = y + squareCenterToEdge(rad, id) * Math.sin(rad)

        // Get distance to move, which depends on angle and gap; skewed gap needs longer x or y distance
        halfGapDistance = squareCenterToEdge(rad, gap)

        // Move first point for gap, way to move depends on what side you're on
        let startSide = radSide(rad)
        if (startSide === "right") {
          inY1 += halfGapDistance
        }
        else if (startSide === "top") {
          inX1 -= halfGapDistance
        }
        else if (startSide === "left") {
          inY1 -= halfGapDistance
        }
        else if (startSide === "bottom") {
          inX1 += halfGapDistance
        }
        
        // Wrap around edges
        if (inY1 > y + halfIn) {
          inX1 -= inY1 - (y + halfIn)
          inY1 = y + halfIn
        }
        if (inX1 < x - halfIn) {
          inY1 -= (x - halfIn) - inX1
          inX1 = x - halfIn
        }
        if (inY1 < y - halfIn) {
          inX1 += (y - halfIn) - inY1
          inY1 = y - halfIn
        }
        if (inX1 > x + halfIn) {
          inY1 += inX1 - (x + halfIn)
          inX1 = x + halfIn
        }
        // Get side of moved point to determine how many corner points to add
        let startRad = (pi2 + Math.atan2(inY1 - y, inX1 - x)) % pi2
        startSide = radSide(startRad)



        // TODO FINISH THIS
        // FIND OUT WHAT THEY DO ON CORNERS
      }
    }

    const squareRoundThermal = ({x, y, os, id, angle, num_spokes, gap}) => {
      const halfIn = id / 2
      const halfOut = os / 2
      const halfGapRad = (gap / 2 / (Math.PI * halfIn)) * Math.PI
      const outCornerDistance = squareCenterToEdge(Math.PI / 4, os)
      const startRad = degreeToRadian(angle)
      const segmentRad = num_spokes ? pi2 / num_spokes : 0

      for (let i = 0; i < num_spokes; i++) { //place inner point and outer point, then any needed corners, then last two points and draw
        let rad, inX1, inY1, inX2, inY2, outX1, outY1, outX2, outY2, halfGapDistance
        const pointsX = [], pointsY = [];
        
        // Get first inner point
        const innerRad1 = startRad
                        + segmentRad * i
                        + halfGapRad
                        % pi2
        inX1 = x + halfIn * Math.cos(innerRad1)
        inY1 = y + halfIn * Math.sin(innerRad1)

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
        if (outY2 > y + halfOut) {
          outX2 -= outY2 - (y + halfOut)
          outY2 = y + halfOut
        }
        if (outX2 < x - halfOut) {
          outY2 -= (x - halfOut) - outX2
          outX2 = x - halfOut
        }
        if (outY2 < y - halfOut) {
          outX2 += (y - halfOut) - outY2
          outY2 = y - halfOut
        }
        if (outX2 > x + halfOut) {
          outY2 += outX2 - (x + halfOut)
          outX2 = x + halfOut
        }

        // Get first inner point
        const innerRad2 = startRad
                        + segmentRad * (i + 1)
                        - halfGapRad
                        % pi2
        inX2 = x + halfIn * Math.cos(innerRad2)
        inY2 = y + halfIn * Math.sin(innerRad2)

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
        if (outY1 < y - halfOut) {
          outX1 -= (y - halfOut) - outY1
          outY1 = y - halfOut
        }
        if (outX1 > x + halfOut) {
          outY1 -= outX1 - (x + halfOut)
          outX1 = x + halfOut
        }
        if (outY1 > y + halfOut) {
          outX1 +=  outY1 - (y + halfOut)
          outY1 = y + halfOut
        }
        if (outX1 < x - halfOut) {
          outY1 += (x - halfOut) - outX1 
          outX1 = x - halfOut
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

        // Draw it!
        ctx.moveTo(pointsX[0], pointsY[0])
        ctx.arc(x, y, halfIn, innerRad2, innerRad1, true)
        for (let i = 1; i < pointsX.length; i++) {
          ctx.lineTo(pointsX[i], pointsY[i])
        }
        ctx.lineTo(pointsX[0], pointsY[0])
      }
    }

    const ellipse = ({x, y, w, h, rotation}) => {
      ctx.ellipse(x, y, w, h, degreeToRadian(rotation) || 0, 0, 2*Math.PI)
    }

    const moire = ({x, y, rw, rg, nr, lw, ll, la}) => {
      const r = ll/2
      circle({x, y, r})
      
    }


    ctx.beginPath()
    ctx.fillStyle = fillStyle

    ctx.save()
    let [ sym_rotation] = symbol.match(/_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])$/g) || [ false ]
    if (sym_rotation) {
      sym_rotation = sym_rotation.substr(1, sym_rotation.length)
      rotate({x, y, degrees: sym_rotation})
    }
    if (rotation) rotate({x, y, degrees: rotation})

    if (type === "square") {
      const [ s ] = getParams()
      square({x, y, s})
    }

    else if (type === "round") {
      const [ d ] = getParams()
      circle({x, y, r: d/2})
    }

    else if (type === "rectangle") {
      const [ w, h ] = getParams()
      rectangle({x, y, w, h})
    }

    else if (type === "rounded rectangle") {
      const [ w, h, rad, corners ] = getParams()
      roundedRectangle({x, y, w, h, rad, corners})
    }

    else if (type === "chamfered rectangle" || type ==="octagon") {
      const [ w, h, rad, corners ] = getParams()
      chamferedRectangle({x, y, w, h, rad, corners})
    }

    else if (type === "oval") {
      const [ w, h ] = getParams()
      roundedRectangle({x, y, w, h, rad: Math.min(w/2, h/2)})
    }

    else if (type === "diamond") {
      const [ w, h ] = getParams()
      diamond({x, y, w, h})
    }

    else if (type === "octagon") {
      const [ w, h, rad ] = getParams()
      chamferedRectangle({x, y, w, h, rad})
    }

    else if (type === "round donut") {
      const [ od, id ] = getParams()
      circle({x, y, r: od/2})
      circle({x, y, r: id/2})
    }

    else if (type === "square donut") {
      const [ od, id ] = getParams()
      square({x, y, s: od})
      square({x, y, s: id})
    }

    else if (type === "square/round donut") {
      const [ od, id ] = getParams()
      square({x, y, s: od})
      circle({x, y, r: id/2})
    }

    else if (type === "rounded square donut") {
      const [ od, id, rad, corners] = getParams()
      roundedRectangle({x, y, w: od, h: od, rad, corners})
      roundedRectangle({x, y, w: id, h: id, rad: Math.max(rad-(od-id)/2,  0), corners})
    }
    
    else if (type === "rectangle donut") {
      const [ ow, oh, lw ] = getParams()
      rectangle({x, y, w: ow, h: oh})
      rectangle({x, y, w: ow-lw*2, h: oh-lw*2})
    }

    else if (type === "rounded rectangle donut") {
      const [ ow, oh, lw, rad, corners ] = getParams()
      roundedRectangle({x, y, w: ow, h: oh, rad, corners})
      roundedRectangle({x, y, w: ow-lw*2, h: oh-lw*2, rad: Math.max(rad-(lw), 0), corners})
    }

    else if (type === "oval donut") {
      const [ ow, oh, lw ] = getParams()
      roundedRectangle({x, y, w: ow, h: oh, rad: Math.min(ow/2, oh/2)})
      roundedRectangle({x, y, w: ow-lw*2, h: oh-lw*2, rad: Math.max(Math.min((ow-lw*2)/2, (oh-lw*2)/2), 0)})
    }

    else if (type === "horizontal hexagon") {
      const [ w, h, r ] = getParams()
      horzHexagon({x, y, w, h, r})
    }

    else if (type === "vertical hexagon") {
      const [ w, h, r ] = getParams()
      vertHexagon({x, y, w, h, r})
    }

    else if (type === "butterfly") {
      const [ d ] = getParams()
      butterfly({x, y, d})
    }

    else if (type === "square butterfly") {
      const [ s ] = getParams()
      sqrButterfly({x, y, s})
    }

    else if (type === "triangle") {
      const [ base, h ] = getParams()
      triangle({x, y, base, h})
    }

    else if (type === "round thermal (rounded)") {
      const [ od, id, angle, num_spokes, gap ] = getParams()
      roundedRoundThermal({x, y, od, id, angle, num_spokes, gap})
    }

    else if (type === "round thermal (squared)") {
      const [ od, id, angle, num_spokes, gap ] = getParams()
      squaredRoundThermal({x, y, od, id, angle, num_spokes, gap})
    }

    else if (type === "square thermal") {
      const [ os, is, angle, num_spokes, gap ] = getParams()
      squareThermal({x, y, os, is, angle, num_spokes, gap})
    }

    else if (type === "square-round thermal") {
      const [ os, id, angle, num_spokes, gap ] = getParams()
      squareRoundThermal({x, y, os, id, angle, num_spokes, gap})
    }

    else if (type === "ellipse") {
      const [ w, h, rotation ] = getParams()
      ellipse({x, y, w, h, rotation})
    }

    ctx.fill("evenodd")
    ctx.restore()
  }

  const draw = () => {
    const ctx = canvasRef.current.getContext("2d")

    ctx.fillStyle = "black"
    ctx.rect(0,0,widthPx,heightPx)
    ctx.fill()
    ctx.closePath()

    for(const feature of features) {
      console.log(feature)
      drawPad({...feature, fillStyle:"yellow"})
    }
  }

  useEffect(draw, [heightPx, widthPx, features])

  return <canvas onClick={draw} ref={canvasRef} height={`${heightPx}px`} width={`${widthPx}px`} style={{
    border: "1px solid", height: `${heightPx}px`, width:`${widthPx}px`
  }}>
    Sorry, your browser doesn't support the canvas tag.
  </canvas>
}