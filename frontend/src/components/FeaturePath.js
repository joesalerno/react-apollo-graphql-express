import React from "react"
import validOdbSymbol from "../modules/validOdbSymbol"

import Square from "./paths/Square"
import Circle from "./paths/Circle"
import Rectangle from "./paths/Rectangle"
import RoundedRectangle from "./paths/RoundedRectangle"
import ChamferedRectangle from "./paths/ChamferedRectangle"
import Diamond from "./paths/Diamond"
import RoundDonut from "./paths/RoundDonut"
import SquareDonut from "./paths/SquareDonut"
import SquareRoundDonut from "./paths/SquareRoundDonut"
import HorizontalHexagon from "./paths/HorizontalHexagon"
import VerticalHexagon from "./paths/VerticalHexagon"
import Butterfly from "./paths/Butterfly"
import SquareButterfly from "./paths/SquareButterfly"
import Triangle from "./paths/Triangle"
import RoundedRoundThermal from "./paths/RoundedRoundThermal"
import SquaredRoundThermal from "./paths/SquaredRoundThermal"
import SquareThermal from "./paths/SquareThermal"
import SquareRoundThermal from "./paths/SquareRoundThermal"
import Ellipse from "./paths/Ellipse"
import RoundedRectangleDonut from "./paths/RoundedRectangleDonut"
import ArcRound from "./paths/ArcRound"

const getSymbolParams = symbol => symbol.match(/[0-9]+(\.[0-9]*)?/g).map(text => parseFloat(text))

export default ({type, symbol, x, y, xs, ys, xe, ye, xc, yc, rotation, ...rest}) => {
  const feature = validOdbSymbol(symbol)
  if (!feature) return console.log({SymbolError: symbol, x, y})

  let [ sym_rotation] = symbol.match(/_(3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])$/g) || [ false ]
  if (sym_rotation) { // remove the _
    sym_rotation = parseFloat(sym_rotation.substr(1, sym_rotation.length))
  }

  const effective_rotation = sym_rotation + (rotation || 0) % 360

  if (type === "line") {
    if (feature === "round") {
      const [ d ] = getSymbolParams(symbol)
      const xc = (xs + xe) / 2
      const yc = (ys + ye) / 2
      const deltaX = xe - xs
      const deltaY = ye - ys
      const rad = Math.atan2(deltaY, deltaX)
      const distance = Math.sqrt(deltaX**2+deltaY**2)+d
      const line_rotation = ((rad/Math.PI)*180) % 360
      return <RoundedRectangle x={xc} y={yc} w={distance} h={d} rad={d} transform={`rotate(${line_rotation} ${xc} ${yc})`}/>
    }
    if (feature === "square") {
      const [ s ] = getSymbolParams(symbol)
      const xc = (xs + xe) / 2
      const yc = (ys + ye) / 2
      const deltaX = xe - xs
      const deltaY = ye - ys
      const distance = Math.sqrt(xs-xe**2+ys-ye**2)
      const rad = Math.atan2(deltaY, deltaX)
      const line_rotation = ((rad/Math.PI)*180) % 360
      return <Rectangle x={xc} y={yc} w={distance} h={s} transform={`rotate(${line_rotation} ${xc} ${yc})`}/>
    }
    return {LineError: symbol, x, y}
  }

  if (type === "arc") {
    if (feature === "round") {
      const [ d ] = getSymbolParams(symbol)
      return <ArcRound xs={xs} ys={ys} xe={xe} ye={ye} xc={xc} yc={yc} r={d/2}/>
    }
    if (feature === "square") {

    }
    return {ArcError: symbol, x, y}
  }

  // pads
  if (feature === "square") {
    const [ s ] = getSymbolParams(symbol)
    return <Square x={x} y={y} s={s} transform={`rotate(${effective_rotation} ${x} ${y})`} {...rest}/>
  }

  else if (feature === "round") {
    const [ d ] = getSymbolParams(symbol)
    return <Circle x={x} y={y} r={d/2} {...rest}/>
  }

  else if (feature === "rectangle") {
    const [ w, h ] = getSymbolParams(symbol)
    return <Rectangle x={x} y={y} w={w} h={h} {...rest}/>
  }

  else if (feature === "rounded rectangle") {
    const [ w, h, rad, corners ] = getSymbolParams(symbol)
    return <RoundedRectangle x={x} y={y} w={w} h={h} rad={rad} corners={corners} {...rest}/>
  }

  else if (feature === "chamfered rectangle") {
    const [ w, h, rad, corners ] = getSymbolParams(symbol)
    return <ChamferedRectangle x={x} y={y} w={w} h={h} rad={rad} corners={corners} {...rest}/>
  }

  else if (feature === "oval") {
    const [ w, h ] = getSymbolParams(symbol)
    return <RoundedRectangle x={x} y={y} w={w} h={h} rad={Math.min(w/2, h/2)} {...rest}/>
  }

  else if (feature === "diamond") {
    const [ w, h ] = getSymbolParams(symbol)
    return <Diamond x={x} y={y} w={w} h={h} {...rest}/>
  }

  else if (feature === "octagon") {
    const [ w, h, rad ] = getSymbolParams(symbol)
    return <ChamferedRectangle x={x} y={y} w={w} h={h} rad={rad} {...rest}/>
  }

  else if (feature === "round donut") {
    const [ od, id ] = getSymbolParams(symbol)
    return <RoundDonut x={x} y={y} od={od} id={id} {...rest}/>
  }

  else if (feature === "square donut") {
    const [ os, is ] = getSymbolParams(symbol)
    return <SquareDonut x={x} y={y} os={os} is={is} {...rest}/>
  }

  else if (feature === "square/round donut") {
    const [ od, id ] = getSymbolParams(symbol)
    return <SquareRoundDonut x={x} y={y} od={od} id={id} {...rest}/>
  }

  else if (feature === "rounded square donut") {
    const [ od, id, rad, corners] = getSymbolParams(symbol)
    // return <RoundedSquareDonut x={x} y={y} od={od} id={id} rad={rad} corners={corners} {...rest}/>
  }
  
  else if (feature === "rectangle donut") {
    const [ ow, oh, lw ] = getSymbolParams(symbol)
    // return <RectangleDonut x={x} y={y} ow={ow} oh={oh} lw={lw} {...rest}/>
  }

  else if (feature === "rounded rectangle donut") {
    const [ ow, oh, lw, rad, corners ] = getSymbolParams(symbol)
    return <RoundedRectangleDonut x={x} y={y} ow={ow} oh={oh} lw={lw} rad={rad} corners={corners} {...rest}/>
  }

  else if (feature === "oval donut") {
    const [ ow, oh, lw ] = getSymbolParams(symbol)
    // return 
  }

  else if (feature === "horizontal hexagon") {
    const [ w, h, r ] = getSymbolParams(symbol)
    return <HorizontalHexagon x={x} y={y} w={w} h={h} r={r} {...rest}/>
  }

  else if (feature === "vertical hexagon") {
    const [ w, h, r ] = getSymbolParams(symbol)
    return <VerticalHexagon x={x} y={y} w={w} h={h} r={r} {...rest}/>
  }

  else if (feature === "butterfly") {
    const [ d ] = getSymbolParams(symbol)
    return <Butterfly x={x} y={y} d={d} {...rest}/>
  }

  else if (feature === "square butterfly") {
    const [ s ] = getSymbolParams(symbol)
    return <SquareButterfly x={x} y={y} s={s} {...rest}/>
  }

  else if (feature === "triangle") {
    const [ base, h ] = getSymbolParams(symbol)
    return <Triangle x={x} y={y} base={base} h={h} {...rest}/>
  }

  else if (feature === "round thermal (rounded)") {
    const [ od, id, angle, num_spokes, gap ] = getSymbolParams(symbol)
    return <RoundedRoundThermal x={x} y={y} od={od} id={id} angle={angle} num_spokes={num_spokes} gap={gap} {...rest}/>
  }

  else if (feature === "round thermal (squared)") {
    const [ od, id, angle, num_spokes, gap ] = getSymbolParams(symbol)
    return <SquaredRoundThermal x={x} y={y} od={od} id={id} angle={angle} num_spokes={num_spokes} gap={gap} {...rest}/>
  }

  else if (feature === "square thermal") {
    const [ os, is, angle, num_spokes, gap ] = getSymbolParams(symbol)
    return <SquareThermal x={x} y={y} os={os} is={is} angle={angle} num_spokes={num_spokes} gap={gap} {...rest}/>
  }

  else if (feature === "square-round thermal") {
    const [ os, id, angle, num_spokes, gap ] = getSymbolParams(symbol)
    return <SquareRoundThermal x={x} y={y} os={os} id={id} angle={angle} num_spokes={num_spokes} gap={gap} {...rest}/>
  }

  else if (feature === "ellipse") {
    const [ w, h, rotation ] = getSymbolParams(symbol)
    return <Ellipse x={x} y={y} w={w} h={h} rotation={rotation} {...rest}/>
  }
}