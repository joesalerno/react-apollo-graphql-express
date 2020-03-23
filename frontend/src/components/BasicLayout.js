import React from "react"
import Logo from "../components/TTMTechnologiesLogo"
import NavBar from "./NavBar"
import "./BasicLayout.css"

const BasicLayout = ({logo, width, children, hideNavBar, ...rest}) => <>

  {!hideNavBar && <NavBar {...rest} />}

  {logo && <Logo className="BasicLayout-Logo" style={{
      margin: "12px auto auto auto", //doesn't work in css file...
      height: width ? `calc(${width}/6)` : "84px",
      width: width || "500px",
  }}/>}

  {children}

</>

export default BasicLayout