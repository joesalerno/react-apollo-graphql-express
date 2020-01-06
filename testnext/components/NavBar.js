import Button from "@material-ui/core/Button"
import "./NavBar.scss"

const NavBar = ({ session, logout }) => <div className="NavBar" style={{display: session && session.user ? "flex" : "none"}}>
  Logged in as {session.user}
  
  <Button variant="contained" color="primary" onClick={logout}>
    Log Out
  </Button>
</div>

export default NavBar