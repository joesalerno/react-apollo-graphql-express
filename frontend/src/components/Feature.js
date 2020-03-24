import React from "react"
import FeaturePath from "./FeaturePath"

export default ({type, symbol, x, y, xs, ys, xe, ye, xc, yc, rad, ccw, rotation, children, ...rest}) => <g {...rest}>
  <FeaturePath type={type} symbol={symbol} x={x} y={y} xs={xs} ys={ys} xe={xe} ye={ye} xc={xc} yc={yc} rad={rad} ccw={ccw} rotation={rotation}/>
  {children}
</g>