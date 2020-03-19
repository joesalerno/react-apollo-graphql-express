import React from "react"
export default ({x, y, base, h}) => {
  const halfBase = base / 2
  const halfH = h/2
  return <path d={`
    M ${x-halfBase} ${y-halfH}
    H ${x+halfBase}
    L ${x} ${y+halfH}
    Z
  `}/>
}