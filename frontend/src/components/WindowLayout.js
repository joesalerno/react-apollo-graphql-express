import React from "react"
import Logo from "../components/TTMTechnologiesLogo"
import Paper from "@material-ui/core/Paper"
import NavBar from "./NavBar"
import "./WindowLayout.css"

const WindowLayout = ({auth, logo, width, children, ...props}) => <>

  {<NavBar {...props} />}

  <div className="Frame">

    {logo && <Logo className="Logo" style={{
      height: width ? `calc(${width}/6)` : "84px",
      width: width || "500px",
    }}/>}

    <Paper component="main" className="Window" style={{
      margin: logo ? "0 auto auto auto" : "auto",
      width: width || "500px",
    }}>

      {children}

    </Paper>

  </div>

</>

export default WindowLayout