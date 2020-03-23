import React from "react"
const sqrt2 = Math.sqrt(2)
export default ({x, y, od, id, ...rest}) => {
  const or = od/2
  const ir = id/2  
  const iCornerDistance = (sqrt2 * ir) /2
  const oCornerDistance = (sqrt2 * or) /2
  const points = [
    [x+or, y],
    [x+oCornerDistance, y-oCornerDistance],
    [x, y-or],
    [x-oCornerDistance, y-oCornerDistance],
    [x-or, y],
    [x-oCornerDistance, y+oCornerDistance],
    [x, y+or],
    [x+oCornerDistance, y+oCornerDistance],
    [x+ir, y],
    [x+iCornerDistance, y-iCornerDistance],
    [x, y-ir],
    [x-iCornerDistance, y-iCornerDistance],
    [x-ir, y],
    [x-iCornerDistance, y+iCornerDistance],
    [x, y+ir],
    [x+iCornerDistance, y+iCornerDistance],
  ]
  return <path points={JSON.stringify(points)} {...rest} d={
   `M ${x+or} ${y}
    A ${or} ${or} 180 0 0 ${x-or} ${y}
    A ${or} ${or} 180 0 0 ${x+or} ${y}
    M ${x-ir} ${y}
    A ${ir} ${ir} 180 1 1 ${x+ir} ${y}
    A ${ir} ${ir} 180 1 1 ${x-ir} ${y}`
  }/>
}