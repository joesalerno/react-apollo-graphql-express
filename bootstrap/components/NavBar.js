import Button from "./node_modules/@material-ui/core/Button"
import TTMLogo from "./TTMTechnologiesLogo"
import "./NavBar.css"

const NavBar = ({ user, logout, title }) => <div className="NavBar" style={{display: user ? "flex" : "none"}}>
  <TTMLogo style={{height:"inherit", width:"200px", margin: "0 8px"}}/>
  <h1 style={{margin:"auto"}}>{title}</h1>
  <Button variant="contained" color="primary" onClick={logout} style={{margin:"0 16px"}}>
    Logout {user}
  </Button>
</div>

export default NavBar