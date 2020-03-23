import React from "react"
export default ({x, y, w, h, r, ...rest}) => {
  const hw = w/2
  const hh = h/2
  const l = hw-r
  const hl = hw-(r/2)
  const hhh = hh/2
  const points = [
    [x+hw, y],
    [x+hl, y-hhh],
    [x+l , y-hh],
    [x   , y-hh],
    [x-l , y-hh],
    [x-hl, y-hhh],
    [x-hw, y],
    [x-hl, y+hhh],
    [x-l , y+hh],
    [x   , y+hh],
    [x+l , y+hh],
    [x+hl, y+hhh]
  ]
  return <path points={JSON.stringify(points)} {...rest} d={
   `M ${x+hw} ${y} 
    L ${x+l}  ${y-hh}
    H ${x-l}
    L ${x-hw} ${y}
    L ${x-l}  ${y+hh}
    H ${x+l}
    Z`
  }/>
}