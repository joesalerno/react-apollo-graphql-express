import React from "react"
const sqrt2 = Math.sqrt(2)
export default ({x, y, od, id, ...rest}) => {
  const or = od/2
  const ir = id/2
  const cornerDistance = (sqrt2 * ir) /2
  const points = [ 
    [x-or, y-or],
    [x-or, y],
    [x-or, y+or],
    [x,   y+or],
    [x+or, y+or],
    [x+or, y],
    [x+or, y-or],
    [x, y-or],
    [x+ir, y],
    [x+cornerDistance, y-cornerDistance],
    [x, y-ir],
    [x-cornerDistance, y-cornerDistance],
    [x-ir, y],
    [x-cornerDistance, y+cornerDistance],
    [x, y+ir],
    [x+cornerDistance, y+cornerDistance],
  ]
  return <path points={JSON.stringify(points)} {...rest} d={
   `M ${x-or} ${y-or}
    H ${x+or}
    V ${y+or}
    H ${x-or}
    Z
    M ${x-ir} ${y}
    A ${ir} ${ir} 180 1 0 ${x+ir} ${y}
    A ${ir} ${ir} 180 1 0 ${x-ir} ${y}`
  }/>
}