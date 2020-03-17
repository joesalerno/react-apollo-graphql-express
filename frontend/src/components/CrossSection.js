import React from "react"
import Tooltip from "@material-ui/core/Tooltip"

export default ({heightPx = 250, widthPx = 250, drillSize, layers}) => <div style={{
  height: `${heightPx}px`, width: `${widthPx}px`,
  background:"#000",
  padding: "1px",
  display: "flex",
  flexDirection: "column"
}}>
  {layers.map(([name, size, color], i) => <Tooltip key={`___cross_section___${i}___`} title={
    //`(Layer : ${name}) (Drill : ${drillSize/1000}") (Pad : ${size/1000}") (A.R. : ${Math.max((size - drillSize)/1000, 0)}")`
    `Drill:(${drillSize/1000}") Pad: (${size/1000}")  Ring: (${Math.max((size - drillSize)/2000, 0)}")`
  }>
    <div style={{
      margin: "auto",
      width: "100%",
      flex: "auto",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      backgroundImage: "linear-gradient(#CCC, #DDD)"
    }}>
      <p style={{position: "absolute", margin:"4px 0 0 4px", color:"#FFF", textShadow: "0 0 2px #000, 0 0 3px #000, 0 0 5px #000, 0 0 10px #000"}}>{name}</p>
      <div style={{
        background: color,
        margin: "auto",
        width: `${(size/drillSize)*(widthPx/10)}px`,
        height: `${heightPx/layers.length}px`
      }}>
        <div style={{
          background: "#333",
          margin: "auto",
          width: `${widthPx/10}px`,
          height: `${heightPx/layers.length}px`,
          display: "flex"
        }}/>
      </div>
    </div>
  </Tooltip>)}
</div>