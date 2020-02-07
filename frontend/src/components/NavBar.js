import React, { useState } from "react"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
// import InputAdornment from "@material-ui/core/InputAdornment"
// import IconButton from "@material-ui/core/IconButton"
// import Visibility from "@material-ui/icons/Visibility"
// import VisibilityOff from "@material-ui/icons/VisibilityOff"
import TTMLogo from "../components/TTMTechnologiesLogo"
import "./NavBar.css"

const NavBar = ({ auth, logout, login, links }) => {
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  // const [showPass, setShowPass] = useState(0)

  const validUsername = () => user.length > 0
  const validPassword = () => pass.length > 0
  const validInput = () => validUsername() && validPassword()

  const handleChange = event => {
    const {
      target: { id, value }
    } = event
    if (id === "username") setUser(value)
    if (id === "password") setPass(value)
  }
  // const handleClickShowPassword = () => setShowPass(!showPass)

  const inputRefs = {}

  const focusNextInput = () => {
    if (!validUsername()) inputRefs.user.focus()
    else if (!validPassword()) inputRefs.pass.focus()
  }

  const handleKeyDown = event => { if (event.key === "Enter")
    validInput() ? login(user, pass) : focusNextInput()
  }

  return (
    <div className="NavBar">
      <TTMLogo
        style={{ height: "inherit", width: "150px", margin: "0 8px" }}
      />

      <div style={{margin:"0 auto 0 0"}}>
        {links && links.map(link => <>
          ⮞&nbsp;
          { link.ref ? <Link to={link.ref} style={{color:"#005291"}}>{ link.name }</Link> : link.name }
          &nbsp;
        </>)}
      </div>
      
      {!auth && (
        <>
          
          <TextField
            autoComplete="username"
            variant="outlined"
            id="username"
            label="Username"
            size="small"
            style={{margin:"0 4px", width: 110}}
            value={user}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            inputRef={ref => { inputRefs.user = ref }}
          />

          <TextField
            autoComplete="password"
            variant="outlined"
            id="password"
            label="Password"
            size="small"
            style={{margin:"0 0 0 4px", width: 130}}
            value={pass}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            inputRef={ref => { inputRefs.pass = ref }}
            type="password"
            // InputProps={{type: showPass ? "text" : "password", endAdornment: (
            //   <InputAdornment position="end">
            //     <IconButton onClick={handleClickShowPassword}>
            //       {showPass ? <Visibility/> : <VisibilityOff/>}
            //     </IconButton>
            //   </InputAdornment>
            // )}}
          /> 

          <Button
            disabled={!validInput()}
            variant="contained"
            color="primary"
            onClick={() => login(user, pass)}
            style={{ margin: "0 8px" }}
          >
            Login
          </Button>
        </>
      )}

      {auth && (
        <Button
          variant="contained"
          color="primary"
          onClick={logout}
          style={{ margin: "0 16px" }}
        >
          Logout {auth}
        </Button>
      )}
    </div>
  )
}

export default NavBar
