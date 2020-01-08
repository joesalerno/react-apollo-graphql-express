import Button from "@material-ui/core/Button"
import "./NavBar.scss"

const NavBar = ({ user, logout }) => <div className="NavBar" style={{display: user ? "flex" : "none"}}>
  <Button variant="contained" color="primary" onClick={logout}>
    Log Out {user}
  </Button>
</div>

export default NavBar