import NavBar from "./NavBar"
import "./BasicLayout.scss"

export default props => <div className="Screen">
  <NavBar {...props}/>
  <div className="Background"> { props.children } </div>
</div>