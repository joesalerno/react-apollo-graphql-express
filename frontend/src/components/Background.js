import React, { memo } from "react"
import Background from "../img/CircuitBoard.jpg"

export default props => (
  <div style={{
    backgroundColor: "#8991B6",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "100vh",
    width: "100vw",
    overflowX: "hidden",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
  }}>
    {props.children}
  </div>
)