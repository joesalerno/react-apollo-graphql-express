import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import SmallWindowView from "./SmallWindowView"

export default props => {
  const [employeeId, setEmployeeId] = useState(0)
  const [username, setUsername] = useState(0)
  const [email, setEmail] = useState(0)
  const [password, setPassword] = useState(0)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = event => {
    const { target: { id, value } } = event
    if (id === "username") setUsername(value)
    if (id === "password") setPassword(value)
    if (id === "email") setEmail(value)
    if (id === "employeeId") setEmployeeId(value)
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const validUsername = () => username.length > 0
    ? {valid: true}
    : {err: "Please enter a valid username (1 or more characters)"}

  const validPassword = () => password.length > 3
    ? {valid: true}
    : {err: "Please enter a valid username (4 or more characters)"}

  const validEmployeeId = () => employeeId.length > 0
    ? {valid: true}
    : {err: "Please enter a valid employee ID (1 or more characters)"}

  const validEmail = () => email.length > 0
    ? {valid: true}
    : {err: "Please enter a valid email (1 or more characters)"}

  const validInput = validUsername().valid && validPassword().valid && validEmployeeId().valid && validEmail().valid

  const inputRefs = {}

  const focusNextInput = () => {
    if (!validEmployeeId().valid) inputRefs.employeeId.focus()
    else if (!validUsername().valid) inputRefs.username.focus()
    else if (!validEmail().valid) inputRefs.email.focus()
    else if (!validPassword().valid) inputRefs.password.focus()
  }

  const handleKeyPress = event => { if (event.key === "Enter")
    validInput ? props.register( username, employeeId, email, password  ) : focusNextInput()
  }

  return <SmallWindowView {...props} pageName="Register" logo>
    <div style={{ margin: "16px", textAlign: "center" }}>

      <Avatar style={{ margin: "0 auto 4px auto" }}>
        <PersonAddOutlinedIcon/>
      </Avatar>

      <Typography component="h1" variant="h5" style={{margin: "16px"}}>
          Register for TTM Production App
      </Typography>

      <TextField 
        id="employeeId"
        inputRef = {(ref) => {inputRefs.employeeId = ref}}
        label="Enter TTM ID" 
        variant="outlined" 
        margin="dense"
        autoComplete="employeeId"
        autoFocus
        required
        fullWidth
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        style={{backgroundColor: "white"}}
      />

      <TextField 
        id="username"
        inputRef = {(ref) => {inputRefs.username = ref}}
        label="Enter Username" 
        variant="outlined" 
        margin="dense"
        autoComplete="username"
        required
        fullWidth
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        style={{backgroundColor: "white"}}
      />

      <TextField 
        id="email"
        inputRef = {(ref) => {inputRefs.email = ref}}
        label="Enter Email" 
        variant="outlined" 
        margin="dense"
        autoComplete="email"
        required
        fullWidth
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        style={{backgroundColor: "white"}}
      />
      
      <TextField 
        id="password"
        inputRef = {(ref) => {inputRefs.password = ref}} 
        label="Enter Password" 
        variant="outlined" 
        margin="dense"
        autoComplete="password"
        required
        fullWidth
        onKeyPress={handleKeyPress}
        onChange={handleChange}  
        InputProps={{ type: showPassword ? "text" : "password",
        endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={handleClickShowPassword}>
            {showPassword ? <Visibility/> : <VisibilityOff/>}
          </IconButton>
        </InputAdornment>)
        }}
        style={{backgroundColor: "white"}}
      />

      <Button 
        id="login"
        color="primary"
        variant="contained"
        disabled={!validEmployeeId().valid || !validUsername().valid || !validEmail().valid || !validPassword().valid}
        fullWidth
        style={{margin: "12px 0"}}
        onClick={() => props.register(username, employeeId, email, password )}
      > Register </Button>

      <Link href="/" variant="body2"> Already have an account? </Link>

    </div>
  </SmallWindowView>
}