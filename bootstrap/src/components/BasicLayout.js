import NavBar from "./NavBar"
import "./BasicLayout.css"

export default props => <div className="Screen">
  <NavBar {...props}/>
  <div className="Frame">
    { props.children }
  </div>
</div>