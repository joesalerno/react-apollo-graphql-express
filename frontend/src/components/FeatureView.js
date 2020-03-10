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