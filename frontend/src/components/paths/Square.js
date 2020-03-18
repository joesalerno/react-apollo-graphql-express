import React from "react"
export default ({x, y, s}) => {
  const r = s/2
  return <path
    d={`M ${x+r} ${y+r} H ${x-r} V ${y-r} H ${x+r} V ${y+r}`}
  />
}