import React from "react"
// const radFromSides = (a, b, opposite) => {
//   if (!a || !b) return 0
//   return Math.acos( ((opposite**2) -(a**2) -(b**2))/( -2*a*b ) )
// }
export default ({xs, ys, xe, ye, xc, yc, r, ...rest}) => {
  // const d1 = xs-xc**2 + ys-yc**2
  // const d2 = xe-xc**2 + ye-yc**2
  // const d3 = xs-xe**2 + ys-ye**2
  // const arcRadians = radFromSides(d1, d2, d3)

  // distance from start to center

  const d2 = (xs-xc)*(xs-xc)+(ys-yc)*(ys-yc)
  const arcRadius = Math.sqrt(d2)
  // console.log({xs, ys, xe, ye, xc, yc, r, d2, arcRadius})

  const largeArc = xe <= xc ? 0 : 1

  // const ir = arcRadians - r
  // const or = arcRadians + r
  // const startRad = ""

  // radiusX
  // radiusY
  // in/out

  // inStart, inEnd
  // outStart, outEnd



  const points = [ [xs, ys], [xe, ye] ]
  return <path points={JSON.stringify(points)} {...rest} d={
   `M ${xs} ${ys}
    A ${arcRadius} ${arcRadius} 0 0 ${largeArc} ${xe} ${ye}
    L ${xc} ${yc}
    Z`
  }/>
}