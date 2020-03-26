import React from "react"
const pi2 = Math.PI * 2

export default ({x, y, polygons, ...rest}) => {
  const points = []
  let pathString = ""
  console.log(polygons)

  const drawPolygon = polygon => {
    pathString += `M ${polygon.points[0].x} ${polygon.points[0].y} `
    points.push([polygon.points[0].x, polygon.points[0].y])
    for (let i = 1; i < polygon.points.length; i++) {
      if (polygon.points[i].x !== undefined) {
        pathString += `L ${polygon.points[i].x} ${polygon.points[i].y}`
        points.push([polygon.points[i].x, polygon.points[i].y])
      } else {
        const xs = points[points.length-1][0]; const xc = polygon.points[i].xc; const xe = polygon.points[i].xe;
        const ys = points[points.length-1][1]; const yc = polygon.points[i].yc; const ye = polygon.points[i].ye;
        const ccw = polygon.points[i].ccw

        const xdev = xc - xs
        const ydev = yc - ys
        const arcRadius = Math.sqrt(xdev*xdev + ydev*ydev)

        const rightofC = xs >= xc
        const leftofC  = xs <= xc
        const belowC   = ys <= yc
        const aboveC   = ys >= yc
        const movingDown  = ye <= ys
        const movingUp    = ye >= ys
        const movingLeft  = xe <= xs
        const movingRight = xe >= xs
      
        const isInvertedArc = (aboveC && movingLeft  && ((leftofC && movingDown)||(rightofC && movingUp)))
                           || (belowC && movingRight && ((leftofC && movingDown)||(rightofC && movingUp)))
        const sweepFlag = (!isInvertedArc && ccw) || (isInvertedArc && !ccw) ? 1 : 0
        const largeArcFlag = ccw ? 1 : 0

        pathString += `A ${arcRadius} ${arcRadius} 0 ${sweepFlag} ${largeArcFlag} ${xe} ${ye}`
        points.push([xe, ye])
      }
    }
    for (const p of polygon.polygons || []){
      drawPolygon(p)
    }
  }

  for (const polygon of polygons) {
    drawPolygon(polygon)
  }

  return <path points={JSON.stringify(points)} {...rest} d={pathString}/>
}