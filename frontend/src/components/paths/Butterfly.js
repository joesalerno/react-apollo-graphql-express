import React from "react"
export default ({x, y, d}) => {
  const r = d/2

  return <path d={`
    M ${x} ${y}
    V ${y+r}
    A ${r} ${r} 90 0 1 ${x-r} ${y}
    H ${x}
    V ${y-r}
    A ${r} ${r} 90 0 1 ${x+r} ${y}
    Z
  `}
/>}