import React from "react"
export default ({x, y, s}) => {
const r = s/2
return <path d={`
  M ${x} ${y}
  V ${y+r}
  H ${x-r}
  V ${y}
  H ${x}
  V ${y-r}
  H ${x+r}
  V ${y}
  Z
`}/>}