import React from "react"
export default ({x, y, w, h}) => {
  const hw = w/2
  const hh = h/2
  return <path
    d={`M ${x+hw} ${y+hh} H ${x-hw} V ${y-hh} H ${x+hw} V ${y+hh}`}
  />
}