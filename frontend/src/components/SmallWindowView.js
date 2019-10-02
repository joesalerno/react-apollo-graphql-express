import React from "react"
import Background from "./Background"
import TTMLogo from "../img/ttmvectorlogo.svg"
import Paper from "@material-ui/core/Paper"
import NavBar from "./NavBar"

export default props => {
  return (
    <Background>
      <React.Fragment>
        {props.auth ? <NavBar {...props} /> : ""}
        <div
          style={{
            flex: "auto",
            display: "flex",
            flexDirection: "column",
            margin: "auto"
          }}
        >
          <div
            style={{
              margin: "auto auto 0 auto",
              background: `url(${TTMLogo})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: "0.9",
              height: "80px",
              width: "359px",
              maxWidth: "100vw",
              filter: "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))"
            }}
          />
          <Paper
            component="main"
            style={{
              margin: "0 auto auto auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "100vw",
              minHeight: "100px",
              backgroundColor: "rgba(255, 255, 255, .95)",
              filter: "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))"
            }}
          >
            {props.children}
          </Paper>
        </div>
      </React.Fragment>
    </Background>
  )
}