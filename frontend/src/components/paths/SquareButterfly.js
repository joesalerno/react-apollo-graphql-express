import React from "react"
export default ({x, y, s, ...rest}) => {
const r = s/2
const points = [ 
  [x, y],
  [x+r, y],
  [x+r, y-r],
  [x, y-r],
  [x-r, y],
  [x-r, y+r],
  [x, y+r],
  // corners that aren't there
  [x+r, y+r],
  [x-r, y-r],
]
return <path points={JSON.stringify(points)} {...rest} d={
 `M ${x} ${y}
  H ${x+r}
  V ${y-r}
  H ${x}
  V ${y}
  H ${x-r}
  V ${y+r}
  H ${x}
  Z`
}/>}