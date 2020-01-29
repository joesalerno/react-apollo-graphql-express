/* eslint-disable react/react-in-jsx-scope */
import Logo from "../src/components/TTMTechnologiesLogo"
import Paper from "@material-ui/core/Paper"
import NavBar from "./NavBar"
import "./WindowLayout.scss"

const WindowLayout = ({children, logo, height, width, windowStyle, ...props}) => <div className="Screen">

  <NavBar {...props}/>

  <div className="Frame">

    { logo && <Logo style={{
      margin: "auto auto 30px auto",                        // have css parse type & divide //
      height: windowStyle && windowStyle.width || width ? `calc(${windowStyle&&windowStyle.width||width}/6)` : "63px",
      width:  windowStyle && windowStyle.width || width || "380px",
    }}/> }

    <Paper className="Window" component="main" style={{ 
      margin: logo ? "0 auto auto auto" : "auto",
      height: height || "",
      width: width || "380px",
      ...windowStyle,
    }}>

      { children }

    </Paper>

  </div>
</div>

export default WindowLayout