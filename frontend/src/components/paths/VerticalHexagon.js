import React from "react"
export default ({x, y, w, h, r}) => {
  const hw = w/2
  const hh = h/2
  return <path d={`
    M ${x}    ${y+hh}
    L ${x+hw} ${y+hh-r}
    L ${x+hw} ${y-hh+r}
    L ${x}    ${y-hh}
    L ${x-hw} ${y-hh+r}
    L ${x-hw} ${y+hh-r}
    Z
  `}/>
}