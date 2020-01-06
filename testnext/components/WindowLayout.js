import TTMLogo from "../public/ttmvectorlogoblue.svg"
import Paper from "@material-ui/core/Paper"
import NavBar from "./NavBar"
import "./WindowLayout.scss"

export default props => <div className="Screen">

  <NavBar {...props}/>

  <div className="Background">

    { !props.logo ? null : <div className="Logo" style={{
      background: `url(${TTMLogo})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      height: `${props.width ? `calc(${props.width}/6)` : "63px"}`,
      width: `${props.width || "380px"}`
    }}/>}

    <Paper className="Window" component="main" style={{ 
      margin: props.logo ? "0 auto auto auto" : "auto",
      height: `${props.height || ""}`,
      width: `${props.width || "380px"}`
    }}>
      { props.children }
    </Paper>

  </div>
</div>