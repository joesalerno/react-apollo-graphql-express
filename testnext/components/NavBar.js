import Button from "@material-ui/core/Button"
import "./NavBar.scss"

const NavBar = ({ user, logout }) => <div className="NavBar" style={{display: user ? "flex" : "none"}}>

  Logged in as {`${user}`}

  <Button variant="contained" color="primary" onClick={logout}>
    Log Out
  </Button>
</div>

export default NavBar