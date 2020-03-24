import React from "react"
// const right = 0
// const top = Math.PI * .5
// const left = Math.PI
// const bottom = Math.PI * 1.5

export default ({xs, ys, xe, ye, xc, yc, r, ...rest}) => {
  const d2 = (xs-xc)*(xs-xc)+(ys-yc)*(ys-yc) // distance from start to center ^ 2
  const arcRadius = Math.sqrt(d2)

  // const m = (ye-ys) / (xe-xs)
  // const b =  ys + (-m * xs)
  // const isCenterUnderLine = 1

  const rightofC = xs >= xc
  const leftofC = xs <= xc
  const belowC = ys <= yc
  const aboveC = ys >= yc
  const movingDown = ye <= ys
  const movingUp = ye >= ys
  const movingLeft = xe <= xs
  const movingRight = xe >= xs

  const isInvertedArc = (aboveC && movingLeft  && ((leftofC && movingDown)||(rightofC && movingUp))) ||
                        (belowC && movingRight && ((leftofC && movingDown)||(rightofC && movingUp)))

  const ir = arcRadius - r
  const or = arcRadius + r
  const startRadians = Math.atan2(yc-ys, xc-xs)
  const endRadians = Math.atan2(ye-yc, xe-xc)

  let points = [
    [
      xs - r * Math.cos(startRadians) * (1 ? 1 : -1),
      ys - r * Math.sin(startRadians) * (1 ? 1 : -1)
    ],
    [
      xe + r * Math.cos(endRadians) * (1 ? 1 : -1),
      ye + r * Math.sin(endRadians) * (1 ? 1 : -1)
    ],
    [
     xe - r * Math.cos(endRadians) * (1 ? 1 : -1),
     ye - r * Math.sin(endRadians) * (1 ? 1 : -1)
    ],
    [
     xs + r * Math.cos(startRadians) * (1 ? 1 : -1),
     ys + r * Math.sin(startRadians) * (1 ? 1 : -1)
    ],
  ]

  points.push([xs - r * Math.cos(startRadians + (Math.PI/2) % (Math.PI * 2)), ys - r * Math.sin(startRadians + (Math.PI/2) % (Math.PI * 2))])
  points.push([xe - r * Math.cos(endRadians + (Math.PI/2) % (Math.PI * 2)), ye - r * Math.sin(endRadians + (Math.PI/2) % (Math.PI * 2))])


  return <path points={JSON.stringify(points)} {...rest} d={
   `M ${points[0][0]} ${points[0][1]}
    A ${or} ${or} 0 ${isInvertedArc ? 1 : 0} 0 ${points[1][0]} ${points[1][1]}
    A ${r} ${r} 0 0 0 ${points[2][0]} ${points[2][1]}
    A ${ir} ${ir} 0 ${isInvertedArc ? 1 : 0} 1 ${points[3][0]} ${points[3][1]}
    A ${r} ${r} 0 0 0 ${points[0][0]} ${points[0][1]}
    `
  }/>
}