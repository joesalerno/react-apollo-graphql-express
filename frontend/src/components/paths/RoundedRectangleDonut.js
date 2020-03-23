import React from "react"
export default ({x, y, ow, oh, lw, rad, corners, ...rest}) => {  
  const ohh = oh/2
  const ohw = ow/2
  const oRad = Math.min(ohh/2, ohw/2, rad)

  const hlw = lw/2
  const ihh = ohh - lw
  const ihw = ohw - lw
  const iRad = Math.min(ihh/2, ihw/2, oRad-hlw)
  
  const cornerString = corners && corners.toString()
  const hasTopRight = !corners || cornerString.match(/1/)
  const hasTopLeft = !corners || cornerString.match(/2/)
  const hasBottomLeft = !corners || cornerString.match(/3/)
  const hasBottomRight = !corners || cornerString.match(/4/)

  const outRight = x+ohw
  const outBottom = y-ohh
  const outLeft = x-ohw
  const outTop = y+ohh

  const inRight = x+ihw
  const inBottom = y-ihh
  const inLeft = x-ihw
  const inTop = y+ihh

  const points = []
  let pathString = ""

  if (hasBottomRight) {
    points.push([outRight, outBottom+oRad])
    points.push([outRight-oRad, outBottom])
    pathString += `M ${outRight} ${outBottom+oRad} `
    pathString += `A ${oRad} ${oRad} 0 0 0 ${outRight-oRad} ${outBottom} `
  } else {
    points.push([outRight, outBottom])
    pathString = `M ${outRight} ${outBottom} `
  }
  points.push([x, outBottom])

  if (hasBottomLeft) {
    // console.log("sdf")
    // console.log(`outLeft: ${outLeft}, oRad: ${oRad}, outBottom:${outBottom} outLeft+oRad:${outLeft+oRad} outBottom+oRad:${outBottom+oRad} `)
    points.push([outLeft+oRad, outBottom])
    points.push([outLeft, outBottom+oRad])
    pathString += `H ${outLeft + oRad} `
    pathString += `A ${oRad} ${oRad} 0 0 0 ${outLeft} ${outBottom+oRad} `
  } else {
    points.push([outLeft, outBottom])
    pathString += `H ${outLeft} `
  }
  points.push([outLeft, y])

  if (hasTopLeft) {
    points.push([outLeft, outTop-oRad])
    points.push([outLeft+oRad, outTop])
    pathString += `V ${outTop - oRad} `
    pathString += `A ${oRad} ${oRad} 0 0 0 ${outLeft+oRad} ${outTop} `
  } else {
    points.push([outLeft, outTop])
    pathString += `V ${outTop} `
  }
  points.push([x, outTop])

  if (hasTopRight) {
    points.push([outRight-oRad, outTop])
    points.push([outRight, outTop-oRad])
    pathString += `H ${outRight - oRad} `
    pathString += `A ${oRad} ${oRad} 0 0 0 ${outRight} ${outTop-oRad} `
  } else {
    points.push([outRight, outTop])
    pathString += `H ${outRight} `
  }
  points.push([outRight, y])

  if (hasBottomRight) {
    pathString += `V ${outBottom + oRad} `
  } else {
    pathString += `V ${outBottom}`
  }

  if (hasBottomLeft) {
    points.push([inLeft, inBottom+iRad])
    points.push([inLeft+iRad, inBottom])
    pathString += `M ${inLeft} ${inBottom+iRad} `
    pathString += `A ${iRad} ${iRad} 0 0 1 ${inLeft+iRad} ${inBottom} `
  } else {
    points.push([inLeft, inBottom])
    pathString += `M ${inLeft} ${inBottom} `
  }
  points.push([x, inBottom])

  if (hasBottomRight) {
    points.push([inRight-iRad, inBottom])
    points.push([inRight, inBottom+iRad])
    pathString += `H ${inRight - iRad} `
    pathString += `A ${iRad} ${iRad} 0 0 1 ${inRight} ${inBottom+iRad} `
  } else {
    points.push([inRight, inBottom])
    pathString += `H ${inRight} `
  }
  points.push([inLeft, y])

  if (hasTopRight) {
    points.push([inRight, inTop-iRad])
    points.push([inRight-iRad, inTop])
    pathString += `V ${inTop - iRad} `
    pathString += `A ${iRad} ${iRad} 0 0 1 ${inRight-iRad} ${inTop} `
  } else {
    points.push([inRight, inTop])
    pathString += `V ${inTop} `
  }
  points.push([x, inTop])

  if (hasTopLeft) {
    points.push([inLeft+iRad, inTop])
    points.push([inLeft, inTop-iRad])
    pathString += `H ${inLeft + iRad} `
    pathString += `A ${iRad} ${iRad} 0 0 1 ${inLeft} ${inTop-iRad} `
  } else {
    points.push([inLeft, inTop])
    pathString += `H ${inLeft} `
  }
  points.push([inRight, y])

  pathString += "Z"

  return <path points={JSON.stringify(points)} {...rest} d={pathString}/>
}