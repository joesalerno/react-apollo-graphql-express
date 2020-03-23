import React from "react"

export default ({x, y, w, h, ...rest}) => {
  const hw = w/2
  const hh = h/2
  const points = [
    [x+hw, y],
    [x, y-hh],
    [x-hw, y],
    [x, y+hh]
  ]
  return <path points={JSON.stringify(points)} {...rest} d={
   `M ${x+hw} ${y}
    A ${hw} ${hh} 180 1 0 ${x-hw} ${y}
    A ${hw} ${hh} 180 1 0 ${x+hw} ${y}`
  }/>
}