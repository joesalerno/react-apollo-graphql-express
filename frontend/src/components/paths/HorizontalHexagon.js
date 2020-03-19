import React from "react"
export default ({x, y, w, h, r}) => {
  const hw = w/2
  const hh = h/2
  return <path d={`
    M ${x+hw}   ${y} 
    L ${x+hw-r} ${y-hh}
    L ${x-hw+r} ${y-hh}
    L ${x-hw}   ${y}
    L ${x-hw+r} ${y+hh}
    L ${x+hw-r} ${y+hh}
    Z
  `}/>
}