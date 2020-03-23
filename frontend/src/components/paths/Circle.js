import React from "react"
const sqrt2 = Math.sqrt(2)
export default ({x, y, r, ...rest}) => {
  const cornerDistance = (sqrt2 * r) /2
  const points = [
    [x+r, y],
    [x+cornerDistance, y-cornerDistance],
    [x, y-r],
    [x-cornerDistance, y-cornerDistance],
    [x-r, y],
    [x-cornerDistance, y+cornerDistance],
    [x, y+r],
    [x+cornerDistance, y+cornerDistance],
  ]
  return <path points={JSON.stringify(points)} {...rest} d={
     `M ${x+r} ${y}
      A ${r} ${r} 180 1 0 ${x-r} ${y} 
      A ${r} ${r} 180 1 0 ${x+r} ${y}`
    }
  />
}