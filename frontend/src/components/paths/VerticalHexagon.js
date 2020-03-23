import React from "react"
export default ({x, y, w, h, r, ...rest}) => {
  const hw = w/2
  const hh = h/2
  const l = hh-r
  const hl = hh-r/2
  const hhw = hw/2
  const points = [
    [x, y+hh],
    [x+hhw, y+hl],
    [x+hw, y+l],
    [x+hw, y],
    [x+hw, y-l],
    [x+hhw, y-hl],
    [x, y-hh],
    [x-hhw, y-hl],
    [x-hw, y-l],
    [x-hw, y],
    [x-hw, y+l],
    [x-hhw, y+hl],
  ]
  return <path points={JSON.stringify(points)} {...rest} d={
   `M ${x}    ${y+hh}
    L ${x+hw} ${y+l}
    L ${x+hw} ${y-l}
    L ${x}    ${y-hh}
    L ${x-hw} ${y-l}
    L ${x-hw} ${y+l}
    Z`
  }/>
}