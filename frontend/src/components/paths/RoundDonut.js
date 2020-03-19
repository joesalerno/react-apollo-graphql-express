import React from "react"
export default ({x, y, od, id}) => {
  const or = od/2
  const ir = id/2  
  return <path d={`
    M ${x-ir} ${y}
    A ${ir} ${ir} 180 1 0 ${x+ir} ${y}
    A ${ir} ${ir} 180 1 0 ${x-ir} ${y}
    M ${x+or} ${y}
    A ${or} ${or} 180 0 1 ${x-or} ${y}
    A ${or} ${or} 180 0 1 ${x+or} ${y}
  `}
  />
}