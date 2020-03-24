import React from "react"
// const right = 0
// const top = Math.PI * .5
// const left = Math.PI
// const bottom = Math.PI * 1.5
const pi2 = Math.PI * 2

export default ({xs, ys, xe, ye, xc, yc, ccw, r, ...rest}) => {
  const d2 = (xs-xc)*(xs-xc)+(ys-yc)*(ys-yc) // distance from start to center ^ 2
  const arcRadius = Math.sqrt(d2)

  //swap start and end if counter-clockwise
  const m_xs = ccw ? xe : xs
  const m_ys = ccw ? ye : ys
  const m_xe = ccw ? xs : xe
  const m_ye = ccw ? ys : ye

  // const m = (ye-ys) / (xe-xs)
  // const b =  ys + (-m * xs)
  // const isCenterUnderLine = 1

  const rightofC = m_xs >= xc
  const leftofC = m_xs <= xc
  const belowC = m_ys <= yc
  const aboveC = m_ys >= yc
  const movingDown = m_ye <= m_ys
  const movingUp = m_ye >= m_ys
  const movingLeft = m_xe <= m_xs
  const movingRight = m_xe >= m_xs

  const isInvertedArc = (aboveC && movingLeft  && ((leftofC && movingDown)||(rightofC && movingUp)))
                     || (belowC && movingRight && ((leftofC && movingDown)||(rightofC && movingUp)))

  const ir = arcRadius - r
  const or = arcRadius + r
  const startRadians = Math.atan2(yc-m_ys, xc-m_xs)
  const endRadians = Math.atan2(yc-m_ye, xc-m_xe)

  let points = [
    [ m_xs - r * Math.cos(startRadians), m_ys - r * Math.sin(startRadians) ],
    [ m_xe - r * Math.cos(endRadians),   m_ye - r * Math.sin(endRadians) ],
    [ m_xe + r * Math.cos(endRadians),   m_ye + r * Math.sin(endRadians) ],
    [ m_xs + r * Math.cos(startRadians), m_ys + r * Math.sin(startRadians) ],
  ]

  points.push([m_xs - r * Math.cos(startRadians + (Math.PI/2) % pi2), m_ys - r * Math.sin(startRadians + (Math.PI/2) % pi2)])
  points.push([m_xe - r * Math.cos(endRadians + (Math.PI/2) % pi2),   m_ye - r * Math.sin(endRadians + (Math.PI/2) % pi2)])
  
  console.log(startRadians)
  console.log(endRadians)
  console.log(startRadians + endRadians)
  console.log((startRadians + endRadians)/2)
  // console.log(Math.cos((startRadians + endRadians)/2))
  // console.log(Math.sin((startRadians + endRadians)/2))

  const centerRad = (((startRadians + endRadians) / 2) + (ccw ? Math.PI : 0)) % pi2

  points.push([xc + ir * Math.cos(centerRad), yc + ir * Math.sin(centerRad)])
  points.push([xc + or * Math.cos(centerRad), yc + or * Math.sin(centerRad)])

  return <path points={JSON.stringify(points)} {...rest} d={
   `M ${points[0][0]} ${points[0][1]}
    A ${or} ${or} 0 ${isInvertedArc ? 1 : 0} 0 ${points[1][0]} ${points[1][1]}
    A ${r} ${r} 0 0 0 ${points[2][0]} ${points[2][1]}
    A ${ir} ${ir} 0 ${isInvertedArc ? 1 : 0} 1 ${points[3][0]} ${points[3][1]}
    A ${r} ${r} 0 0 0 ${points[0][0]} ${points[0][1]}
    `
  }/>
}