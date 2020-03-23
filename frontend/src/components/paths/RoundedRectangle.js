import React from "react"
export default ({x, y, w, h, rad: _rad, corners, ...rest}) => {
  let rad = _rad
  if (w < 2 * rad) rad = w / 2
  if (h < 2 * rad) rad = h / 2

  const cornerString = corners && corners.toString()
  const hasTopRight = !corners || cornerString.match(/1/)
  const hasTopLeft = !corners || cornerString.match(/2/)
  const hasBottomLeft = !corners || cornerString.match(/3/)
  const hasBottomRight = !corners || cornerString.match(/4/)

  const hw = w/2
  const hh = h/2
  const right = x+hw
  const top = y+hh
  const left = x-hw
  const bottom = y-hh

  const points = []
  let pathString = ""

  if (hasBottomRight) {
    points.push([right, bottom+rad])
    points.push([right-rad, bottom])
    pathString = `M ${points[points.length-1][0]} ${points[points.length-1][1]} `
    pathString += `A ${rad} ${rad} 0 0 0 ${right-rad} ${bottom} `
  } else {
    points.push([right, bottom])
    pathString = `M ${right} ${bottom} `
  }
  points.push([x, bottom])

  if (hasBottomLeft) {
    points.push([left+rad, bottom])
    points.push([left, bottom+rad])
    pathString += `H ${left + rad} `
    pathString += `A ${rad} ${rad} 0 0 0 ${left} ${bottom+rad} `
  } else {
    points.push([left, bottom])
    pathString += `H ${left} `
  }
  points.push ([left, y])

  if (hasTopLeft) {
    points.push([left, top-rad])
    points.push([left+rad, top])
    pathString += `V ${top - rad} `
    pathString += `A ${rad} ${rad} 0 0 0 ${left+rad} ${top} `
  } else {
    points.push([left, top])
    pathString += `V ${top} `
  }
  points.push([x, top])

  if (hasTopRight) {
    points.push([right-rad, top])
    points.push([right, top-rad])
    pathString += `H ${right - rad} `
    pathString += `A ${rad} ${rad} 0 0 0 ${right} ${top-rad} `
  } else {
    points.push([right, top])
    pathString += `H ${right} `
  }
  points.push([right, y])

  if (hasBottomRight) {
    pathString += `V ${bottom + rad} `
    pathString += `A ${rad} ${rad} 0 0 0 ${right-rad} ${bottom}`
  } else {
    pathString += "Z"
  }

  return <path points={JSON.stringify(points)} {...rest} d={pathString}/>
}