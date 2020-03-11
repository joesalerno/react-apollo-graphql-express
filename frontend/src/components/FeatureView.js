import React, { useRef, useEffect } from "react"
import validOdbSymbol from "../modules/validOdbSymbol"
const degreeToRadian = degree => degree * Math.PI / 180



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
      if (w < 2 * rad) rad = w / 2 //fix rad > h*2 or w*2
      if (h < 2 * rad) rad = h / 2
      const halfW = w / 2; const halfH = h / 2
      ctx.moveTo(x+halfW, y+halfH)
      ctx.arcTo(x-halfW, y+halfH, x-halfW, y-halfH, rad)
      ctx.arcTo(x-halfW, y-halfH, x+halfW, y-halfH, rad)
      ctx.arcTo(x+halfW, y-halfH, x+halfW, y+halfH, rad)
      ctx.arcTo(x+halfW, y+halfH, x-halfW, y+halfH, rad)
    }
    const chamferedRectangle = ({x, y, w, h, rad, corners}) => {
      if (w < 2 * rad) rad = w / 2 //fix rad > h*2 or w*2
      if (h < 2 * rad) rad = h / 2
      const halfW = w / 2; const halfH = h / 2
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
      //ctx.arc(x, y, d/2, 0, 2*Math.PI)
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
      console.log({roundedRoundThermal: {x, y, od, id, angle, num_spokes, gap}})
      const lw = od - id || 0
      const pi2 = 2*Math.PI 
      const avg = (od + id) / 2
      const startRad = degreeToRadian(angle)
      console.log({gap, lw, avg})
      const halfGapRad = avg ? gap/avg * Math.PI : 0
      const segmentRad = num_spokes ? pi2/num_spokes : 0
      const smallArcRad = avg ? lw/avg * Math.PI : 0

      const sections = []
      for (let i = 0, rad; i < num_spokes; i++) {
        const arcPointsY = []; const arcPointsX = [];
        const tangentsX = [];  const tangentsY = [];
        console.log({lw, segmentRad, start: degreeToRadian(angle), avg, halfGapRad, smallArcRad, thing2: lw ? pi2 * (lw/id) : 0})
        // ID Point
        rad = + startRad                            // start angle
              + halfGapRad                          // half of gap % of id // move over half of gap.. radians 2pi(fullr) * ()
              + segmentRad * i                      // this % around       // move over for i
              + smallArcRad            // lw % of id          // move over small circle r
        arcPointsX.push(x + id * Math.cos(rad))
        arcPointsY.push(y + id * Math.sin(rad))

        // Tangent Point
        rad = + startRad                            // start angle
              + segmentRad * i                      // this % around
        tangentsX.push(x + avg * Math.cos(rad))
        tangentsY.push(y + avg * Math.sin(rad))

        // OD point
        rad = + startRad                            // start angle
              + halfGapRad                          // half of gap % of od
              + segmentRad * i                      // this % around
              + smallArcRad            // lw % of od
        arcPointsX.push(x + od * Math.cos(rad))
        arcPointsY.push(y + od * Math.sin(rad))

        // Tangent Point
        rad = + startRad                            // start angle
              + segmentRad * (i+0.5)                  // this % around + half a segment
        tangentsX.push(x + (od+.001) * Math.cos(rad))
        tangentsY.push(y + (od+.001) * Math.sin(rad))

        // OD Point
        rad = + startRad                            // start angle
              - halfGapRad                          // half of gap % of od
              + segmentRad * (i+1)                    // next % around
              - smallArcRad            // lw % of od
        arcPointsX.push(x + od * Math.cos(rad))
        arcPointsY.push(y + od * Math.sin(rad))

        // Tangent Point
        rad = + startRad                            // start angle
              + segmentRad * (i+1)                    // next % around
        tangentsX.push(x + avg * Math.cos(rad))
        tangentsY.push(y + avg * Math.sin(rad))

        // ID Point
        rad = + startRad                            // start angle
              - halfGapRad                          // half of gap % of id
              + segmentRad * (i+1)                    // next % around
              - smallArcRad            // lw % of id
        arcPointsX.push(x + id * Math.cos(rad))
        arcPointsY.push(y + id * Math.sin(rad))
        
        // Tangent Point
        rad = + startRad                            // start angle
              + segmentRad * (i+0.5)                  // this % around + half a segment
        tangentsX.push(x + (id+.001) * Math.cos(rad))
        tangentsY.push(y + (id+.001) * Math.sin(rad))
        
        sections.push([arcPointsX, arcPointsY, tangentsX, tangentsY])
      }

      //console.log({arcPointsX, arcPointsY,})
      circle({x, y, r: 4})
      ctx.fill()
      ctx.closePath()
      //for (let i = 0; i < arcPointsX.length; i++) circle({x: arcPointsX[i], y: arcPointsY[i], r: 3})

      for (const [arcPointsX, arcPointsY, tangentsX, tangentsY] of sections) {
        ctx.fillStyle = "blue"
        // ctx.beginPath()
        // circle({x: arcPointsX[0], y: arcPointsY[0], r: 3})
        // circle({x: arcPointsX[1], y: arcPointsY[1], r: 3})
        // circle({x: arcPointsX[2], y: arcPointsY[2], r: 3})
        // circle({x: arcPointsX[3], y: arcPointsY[3], r: 3})
        // circle({x: tangentsX[0], y: tangentsY[0], r: 3})
        // circle({x: tangentsX[1], y: tangentsY[1], r: 3})
        // circle({x: tangentsX[2], y: tangentsY[2], r: 3})
        // circle({x: tangentsX[3], y: tangentsY[3], r: 3})

        // ctx.closePath()
        // ctx.fill()
        // ctx.fillStyle = "yellow"
        ctx.beginPath()
        ctx.moveTo(arcPointsX[0], arcPointsY[0])
        ctx.lineTo( tangentsX[0],  tangentsY[0])
        ctx.lineTo(arcPointsX[1], arcPointsY[1])
        ctx.lineTo( tangentsX[1],  tangentsY[1])
        ctx.lineTo(arcPointsX[2], arcPointsY[2])
        ctx.lineTo( tangentsX[2],  tangentsY[2])
        ctx.lineTo(arcPointsX[3], arcPointsY[3])
        ctx.lineTo( tangentsX[3],  tangentsY[3])
        ctx.lineTo(arcPointsX[0], arcPointsY[0])
        ctx.closePath()
        ctx.fill()
      }
      
      console.log(sections)
      for (const [arcPointsX, arcPointsY, tangentsX, tangentsY] of sections) {
        // ctx.fillStle = "green"
        // ctx.moveTo(arcPointsX[0], arcPointsY[0])
        // ctx.arcTo(tangentsX[0], tangentsY[0], arcPointsX[1], arcPointsY[1], lw)
        // ctx.arcTo(tangentsX[1], tangentsY[1], arcPointsX[2], arcPointsY[2], od)
        // ctx.arcTo(tangentsX[2], tangentsY[2], arcPointsX[3], arcPointsY[3], od)

      }
      
      ctx.fillStyle = "red"
      //let arcPointX1 = x + od * Math.cos(degreeToRadian(angle))
      //let arcPointY1 = y + od * Math.sin(degreeToRadian(angle))


      //ctx.moveTo(firstArcPoint)
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
      /* Below draws ellipse, they mean a slot */
      // const [ w, h, rotation ] = getParams()
      // ctx.ellipse(x, y, w, h, degreeToRadian(rotation) || 0, 0, 2*Math.PI)
      // ctx.fill()
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

    ctx.fill("evenodd")
    ctx.restore()
  }

  const draw = () => {
    const ctx = canvasRef.current.getContext("2d")

    //const canvas = canvasRef.current
    //const ctx = canvas.getContext("2d")

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