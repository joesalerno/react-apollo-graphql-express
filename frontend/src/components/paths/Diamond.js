import React from "react"
export default ({x, y, w, h, ...rest}) => {
  const hw = w/2
  const hh = h/2
  const hhw = hw/2
  const hhh = hh/2

  const points = [
    [x, y-hh],
    [x-hhw, y-hhh],
    [x-hw, y],
    [x-hhw, y+hhh],
    [x, y+hh],
    [x+hhw, y+hhh],
    [x+hw, y],
    [x+hhw, y-hhh]
  ]
  return <path points={JSON.stringify(points)} {...rest} d={
   `M ${x} ${y-hh} 
    L ${x-hw} ${y}
    L ${x} ${y+hh}
    L ${x+hw} ${y}
    Z`
  }/>
}