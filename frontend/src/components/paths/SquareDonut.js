import React from "react"
export default ({x, y, os, is}) => {
  const or = os/2
  const ir = is/2  
  return <path d={`
    M ${x-or} ${y-or}
    H ${x+or}
    V ${y+or}
    H ${x-or}
    Z
    M ${x-ir} ${y-ir}
    V ${y+ir}
    H ${x+ir}
    V ${y-ir}
    Z
  `}
  />
}