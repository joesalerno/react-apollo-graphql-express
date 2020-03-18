import React from "react"
export default ({x, y, w, h, rad: _rad, corners}) => {
  let rad = _rad
  if (w < 2 * rad) rad = w / 2
  if (h < 2 * rad) rad = h / 2

  const hw = w/2
  const hh = h/2
  const right = x+hw
  const top = y+hh
  const left = x-hw
  const bottom = y-hh

  return <path d={`
    M ${right} ${top-rad}
    L ${right-rad} ${top}
    H ${left+rad}
    L ${left} ${top-rad}
    V ${bottom+rad}
    L ${left+rad} ${bottom}
    H ${right-rad}
    L ${right} ${bottom+rad}
    Z
  `}/>
}