import TTMLogo from "../components/TTMTechnologiesLogo"
import Paper from "@material-ui/core/Paper"
import NavBar from "./NavBar"
import "./WindowLayout.scss"

export default props => <div className="Screen">

  <NavBar {...props}/>

  <div className="Frame">

    { !props.logo ? null :
    <TTMLogo style={{
      margin: "auto auto 30px auto",
      height: (props.windowStyle && props.windowStyle.width) || props.width ? `calc(${(props.windowStyle && props.windowStyle.width || props.width)}/6)` : "63px",
      width: (props.windowStyle && props.windowStyle.width) || props.width ? `${props.windowStyle && props.windowStyle.width || props.width}` : "380px"
    }}/>}

    <Paper className="Window" component="main" style={{ 
      margin: props.logo ? "0 auto auto auto" : "auto",
      height: props.height || "",
      width: props.width || "380px",
      ...props.windowStyle,
    }}>

      { props.children }

    </Paper>

  </div>
</div>