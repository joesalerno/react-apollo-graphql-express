import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Button from "@material-ui/core/Button"
import WindowLayout from "../components/WindowLayout"

const RegisterPage = ({auth, login, logout, register}) => {
  const [user, setUser] = useState(0)
  const [pass, setPass] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleClickShowPass = () => setShowPass(!showPass)

  const validUser = () => user.length > 0
  const validPass = () => pass.length > 3
  const validInput = validUser() && validPass()

  const inputRefs = {}

  const focusNextInput = () => {
    if (!validUser().valid) inputRefs.user.focus()
    else if (!validPass().valid) inputRefs.pass.focus()
  }

  const handleKeyDown = ({key}) => {
    if (key === "Enter") validInput ? register( user, pass  ) : focusNextInput()
  }

  const handleChange = event => {
    const { target: { id, value } } = event
    if (id === "user") setUser(value)
    if (id === "pass") setPass(value)
  }

  const links = [{name:"CAM",ref:"/"},{name:"Register"}]
  return <WindowLayout links={links} title={"Register"} auth={auth} login={login} logout={logout} windowProps={{minHeight:"100px"}}>
    <div style={{width:476, margin:12, display:"flex", flexDirection:"column"}}>

      <TextField 
        id="user"
        inputRef = {(ref) => {inputRefs.user = ref}}
        label="Enter Username"
        variant="outlined"
        autoComplete="username"
        autoFocus
        required
        fullWidth
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        style={{backgroundColor: "white", margin:"6px 0"}}
      />

      <TextField 
        id="pass"
        inputRef = {(ref) => {inputRefs.pass = ref}} 
        label="Enter Password" 
        variant="outlined"
        autoComplete="password"
        required
        fullWidth
        onKeyDown={handleKeyDown}
        onChange={handleChange}  
        InputProps={{ type: showPass ? "text" : "password",
        endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={handleClickShowPass}>
            {showPass ? <Visibility/> : <VisibilityOff/>}
          </IconButton>
        </InputAdornment>)
        }}
        style={{backgroundColor: "white", margin:"6px 0"}}
      />

      <Button 
        id="login"
        color="primary"
        variant="contained"
        disabled={!validInput}
        fullWidth
        style={{margin: "12px 0 0 0"}}
        onClick={() => register(user, pass)}
      > Register </Button>

    </div>
  </WindowLayout>
}
export default RegisterPage