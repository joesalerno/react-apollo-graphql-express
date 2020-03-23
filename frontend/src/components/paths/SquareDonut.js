import React from "react"
export default ({x, y, os, is, ...rest}) => {
  const or = os/2
  const ir = is/2
  const points = [ 
    [x-or, y-or],
    [x-or, y],
    [x-or, y+or],
    [x,   y+or],
    [x+or, y+or],
    [x+or, y],
    [x+or, y-or],
    [x, y-or],
    [x-ir, y-ir],
    [x-ir, y],
    [x-ir, y+ir],
    [x,   y+ir],
    [x+ir, y+ir],
    [x+ir, y],
    [x+ir, y-ir],
    [x, y-ir],
  ]
  return <path points={JSON.stringify(points)} {...rest} d={
   `M ${x-or} ${y-or}
    H ${x+or}
    V ${y+or}
    H ${x-or}
    Z
    M ${x-ir} ${y-ir}
    V ${y+ir}
    H ${x+ir}
    V ${y-ir}
    Z`
  }/>
}