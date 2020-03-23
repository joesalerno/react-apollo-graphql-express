import React from "react"
const sqrt2 = Math.sqrt(2)
export default ({x, y, d, ...rest}) => {
  const r = d/2
  const cornerDistance = (sqrt2 * r) /2
  const points = [
    [x, y],
    [x+r, y],
    [x+cornerDistance, y-cornerDistance],
    [x, y-r],
    [x-r, y],
    [x-cornerDistance, y+cornerDistance],
    [x, y+r]
  ]
  return <path points={JSON.stringify(points)} {...rest} d={
   `M ${x} ${y}
    H ${x+r}
    A ${r} ${r} 90 0 0 ${x} ${y-r}
    V ${y}
    H ${x-r}
    A ${r} ${r} 90 0 0 ${x} ${y+r}
    Z`
  }
/>}