import React, { memo } from "react"
import Background from "./Background"
import TTMLogo from "../img/ttmvectorlogo.svg"
import Paper from "@material-ui/core/Paper"
import NavBar from "./NavBar"

export default props => <Background>
  {props.auth ? <NavBar {...props} /> : ""}
  <div
    style={{
      display: "flex",
      flex: "auto",
      flexDirection: "column",
      margin: "8px 0",
    }}
  >
    { !props.logo ? null : 
      <div style={{
        margin: "auto auto 6px auto",
        background: `url(${TTMLogo})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        opacity: "0.9",
        height: `${props.width ? `calc(${props.width}/6)` : "84px"}`,
        width: `${props.width ? props.width : "500px"}`,
        maxWidth: "100vw",
        filter: "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))"
      }}/>
    }
    <Paper
      component="main"
      style={{
        overflow: "visible",
        WebkitOverflowScrolling: "touch",
        margin: props.logo ? "0 auto auto auto" : "auto",
        width: `${props.width ? props.width : "500px"}`,
        maxWidth: "100vw",
        backgroundColor: "rgba(255, 255, 255, .95)",
        filter: "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))",
      }}
    >
      {props.children}
    </Paper>
  </div>
</Background>