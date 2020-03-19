import React from "react"
export default ({x, y, od, id}) => {
  const or = od/2
  const ir = id/2
  return <path d={`
    M ${x-or} ${y-or}
    H ${x+or}
    V ${y+or}
    H ${x-or}
    Z
    M ${x-ir} ${y}
    A ${ir} ${ir} 180 1 0 ${x+ir} ${y}
    A ${ir} ${ir} 180 1 0 ${x-ir} ${y}
  `}
  />
}