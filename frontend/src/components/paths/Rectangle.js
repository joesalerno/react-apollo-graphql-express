import React from "react"
export default ({x, y, w, h, ...rest}) => {
  const hw = w/2
  const hh = h/2
  const points = [
    [x-hw, y-hh],
    [x-hw, y],
    [x-hw, y+hh],
    [x, y+hh],
    [x+hw, y+hh],
    [x+hw, y],
    [x+hw, y-hh],
    [x, y-hh],
  ]
  return <path points={JSON.stringify(points)} {...rest} d={
   `M ${x-hw} ${y-hh}
    V ${y+hh}
    H ${x+hw}
    V ${y-hh}
    Z`
  }/>
}