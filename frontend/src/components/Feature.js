import React from "react"
import FeaturePath from "./FeaturePath"

export default ({type, symbol, x, y, xs, ys, xe, ye, xc, yc, rotation, children, ...rest}) => <g {...rest}>
  <FeaturePath type={type} symbol={symbol} x={x} y={y} xs={xs} ys={ys} xe={xe} ye={ye} xc={xc} yc={yc} rotation={rotation}/>
  {children}
</g>