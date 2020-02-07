import React from "react"
import Logo from "../components/TTMTechnologiesLogo"
import Paper from "@material-ui/core/Paper"
import NavBar from "./NavBar"
import "./WindowLayout.css"

const WindowLayout = ({logo, width, children, title, windowProps, ...rest}) => <>

  {<NavBar {...rest} />}

  <div className="Frame">

    {logo && <Logo className="Logo" style={{
      height: width ? `calc(${width}/6)` : "84px",
      width: width || "500px",
    }}/>}

    <Paper component="main" className="Window" style={{
      margin: logo ? "0 auto auto auto" : "auto",
      width: width || "500px",
    }}>
      {title && <>
        <div style={{height:36, display:"flex"}}>
          <h2 style={{textAlign:"center",  color:"#005291", margin:"auto" }}>{title}</h2>
        </div>

        <div style={{height:1, width:"95%", backgroundColor:"#005291", margin:"0 auto"}}/>
      </>}

      {children}

    </Paper>

  </div>

</>

export default WindowLayout