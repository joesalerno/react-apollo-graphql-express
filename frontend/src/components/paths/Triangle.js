import React from "react"
export default ({x, y, base, h, ...rest}) => {
  const halfBase = base / 2
  const halfH = h/2
  const points = [ 
    [x-halfBase, y-halfH],
    [x-halfBase/2, y],
    [x, y+halfH],
    [x+halfBase/2, y],
    [x+halfBase, y-halfH],
    [x, y-halfH]
  ]
  return <path points={JSON.stringify(points)} {...rest} d={
   `M ${x-halfBase} ${y-halfH}
    L ${x} ${y+halfH}
    L ${x+halfBase} ${y-halfH}
    Z`
  }/>
}