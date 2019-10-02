import React from "react"
import Background from "../img/CircuitBoard.jpg"

export default props => (
  <div style={{
    backgroundColor: "#8991B6",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    maxWidth: "100vw",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column"
  }}>
    {props.children}
  </div>
)