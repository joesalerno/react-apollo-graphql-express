import React from "react"
import TTMLogo from "../img/ttmvectorlogoblue.svg"

const TTMTechnologiesLogo = ({style}) => <div style={{
  ...style,
  background: `url(${TTMLogo})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}}/>

export default TTMTechnologiesLogo