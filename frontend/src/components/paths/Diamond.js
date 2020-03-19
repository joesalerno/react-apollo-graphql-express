import React from "react"
export default ({x, y, w, h}) => {
  const hw = w/2
  const hh = h/2
  return <path d={`
    M ${x+hw} ${y} 
    L ${x} ${y+hh}
    L ${x-hw} ${y}
    L ${x} ${y-hh}
    Z
  `}/>
}