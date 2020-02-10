import React from "react"
import Logo from "../components/TTMTechnologiesLogo"
import Paper from "@material-ui/core/Paper"
import NavBar from "./NavBar"
import "./WindowLayout.css"

const WindowLayout = ({logo, width, children, title, windowProps, ...rest}) => <>

  {<NavBar {...rest} />}

  <div className="WindowLayout-Frame">

    {logo && <Logo className="WindowLayout-Logo" style={{
      margin: "auto auto 12px auto", //doesn't work in css file...
      height: width || (windowProps && windowProps.width) ? `calc(${width || (windowProps && windowProps.width)}/6)` : "84px",
      width: width || (windowProps && windowProps.width) || "500px",
    }}/>}

    <Paper component="main" className="WindowLayout-Window" style={{
      margin: logo ? "0 auto auto auto" : "auto",
      width: width || "500px",
      ...windowProps
    }}>

      {title && <>
        <div className="WindowLayout-TitleDiv">
          <h2 className="WindowLayout-Title"> {title} </h2>
        </div>

        <div className="WindowLayout-Divider"/>
      </>}

      {children}

    </Paper>

  </div>

</>

export default WindowLayout