import React from "react"
export default ({x, y, s, ...rest}) => {
  const r = s/2
  const points = [ 
    [x-r, y-r],
    [x-r, y],
    [x-r, y+r],
    [x,   y+r],
    [x+r, y+r],
    [x+r, y],
    [x+r, y-r],
    [x, y-r],
  ]
  return <path points={JSON.stringify(points)} {...rest} d={
   `M ${x+r} ${y+r} 
    H ${x-r}
    V ${y-r}
    H ${x+r}
    V ${y+r}`
  }/>
}