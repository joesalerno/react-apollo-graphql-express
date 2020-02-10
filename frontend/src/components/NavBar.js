import React, { useState, Fragment } from "react"
import { Link, useHistory } from "react-router-dom"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import TTMLogo from "../components/TTMTechnologiesLogo"
import { userFromToken } from "../modules"
import "./NavBar.css"

const NavBar = ({ auth, logout, login, links }) => {
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")

  const history = useHistory()

  const [userMenuAnchor, setUserMenuAnchor] = useState(null)
  const handleUserMenuClick = event => setUserMenuAnchor(event.currentTarget)
  const handleUserMenuClose = () => setUserMenuAnchor(null)

  const validUser = () => user.length > 0
  const validPass = () => pass.length > 3
  const validInput = validUser() && validPass()

  const inputRefs = {}

  const focusNextInput = () => {
    if (!validUser()) inputRefs.user.focus()
    else if (!validPass()) inputRefs.pass.focus()
  }

  const handleKeyDown = ({key}) => {
    if (key === "Enter") validInput ? login( user, pass  ) : focusNextInput()
  }

  const handleChange = event => {
    const { target: { id, value } } = event
    if (id === "user") setUser(value)
    if (id === "pass") setPass(value)
  }

  return <div className="NavBar">
    
    <TTMLogo style={{ height: 60, width: 150, margin: "0 8px" }}/>

    <div style={{margin:"0 auto 0 0"}}>
      {links && links.map(link => <Fragment key={`div-${link.name}`}>
        ❯&nbsp;
        { link.ref ? <Link key={`link-${link.name}`} to={link.ref} style={{color:"#005291"}}>{ link.name }</Link> : link.name }
        &nbsp;
      </Fragment>)}
    </div>

    <Menu id="user-menu" anchorEl={userMenuAnchor} keepMounted open={Boolean(userMenuAnchor)} onClose={handleUserMenuClose}>
      <MenuItem onClick={() => {handleUserMenuClose(); history.push("/settings")}}> Settings </MenuItem>
      <MenuItem onClick={() => {handleUserMenuClose(); logout()}}> Logout </MenuItem>
    </Menu>

    {!userFromToken(auth) && <div>
      <TextField
        id="user"
        label="Username"
        autoComplete="username"
        variant="outlined"
        size="small"
        style={{margin:"0 4px", width: 110, flex:"none"}}
        value={user}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        inputRef={ref => { inputRefs.user = ref }}
      />

      <TextField
        id="pass"
        label="Password"
        autoComplete="password"
        type="password"
        variant="outlined"
        size="small"
        style={{margin:"0 0 0 4px", width: 130, flex:"none"}}
        value={pass}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        inputRef={ref => { inputRefs.pass = ref }}
      /> 
      
      <Button
        disabled={!validInput}
        variant="contained"
        color="primary"
        onClick={() => login(user, pass)}
        style={{ margin: "2px 8px 0 8px", padding:"6px 16px 5px 16px" }}
      > Login </Button>

    </div>}

    {userFromToken(auth) && <Button variant="outlined" onClick={handleUserMenuClick} style={{ margin: "0" }}>
      {userFromToken(auth)}
      <AccountCircleIcon fontSize="inherit" style={{margin: "5px 0px 5px 5px"}}/>
    </Button>}

    {userFromToken(auth) && <Button
      variant="contained"
      color="primary"
      onClick={()=>{ setUser(""); setPass(""); logout(); }}
      style={{ margin: "0 16px" }}
    > Logout </Button>}

  </div>
}

export default NavBar