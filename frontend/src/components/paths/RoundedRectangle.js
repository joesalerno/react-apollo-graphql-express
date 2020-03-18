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
    A ${rad} ${rad} 0 0 1 ${right-rad} ${top}
    H ${left+rad}
    A ${rad} ${rad} 0 0 1 ${left} ${top-rad}
    V ${bottom+rad}
    A ${rad} ${rad} 0 0 1 ${left+rad} ${bottom}
    H ${right-rad}
    A ${rad} ${rad} 0 0 1 ${right} ${bottom+rad}
    Z
  `}/>
}