import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import IconButton from "@material-ui/core/IconButton"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import SmallWindowView from "./SmallWindowView"

export default props => {
  const [username, setUsername] = useState(0)
  const [password, setPassword] = useState(0)
  const [showPassword, setShowPassword] = useState(0)

  const validUsername = () => username.length > 0
    ? {valid: true}
    : {err: "Please enter a valid username (1 or more characters)"}

  const validPassword = () => password.length > 3
    ? {valid: true}
    : {err: "Please enter a valid username (4 or more characters)"}

  const validInput = validUsername().valid && validPassword().valid

  const inputRefs = {}

  const handleChange = event => {
    const { target: { id, value } } = event
    if (id === "username") setUsername(value)
    if (id === "password") setPassword(value)
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const focusNextInput = () => {
    if (!validUsername().valid) inputRefs.username.focus()
    else if (!validPassword().valid) inputRefs.password.focus()
  }

  const handleKeyDown = event => { if (event.key === "Enter")
    validInput ? props.login(username, password) : focusNextInput()
  }

  return <SmallWindowView width="380px" logo>
    <div style={{ margin: "16px" }}>

      <Avatar style={{ margin: "0 auto 4px auto" }}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography
        component="h1"
        variant="h5"
        style={{ textAlign: "center", margin: "0 0 8px 0" }}
      > Sign in to TTM Production App </Typography>

      <TextField
        id="username"
        inputRef={ref => { inputRefs.username = ref }}
        label="Enter Username"
        variant="outlined"
        margin="dense"
        autoComplete="username"
        autoFocus
        required
        fullWidth
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        style={{ backgroundColor: "white" }}
      />

      <TextField
        id="password"
        inputRef={ref => { inputRefs.password = ref }}
        label="Enter Password"
        variant="outlined"
        margin="dense"
        autoComplete="password"
        required
        fullWidth
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        InputProps={{ type: showPassword ? "text" : "password",
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
          </InputAdornment>
        )
        }}
        style={{ backgroundColor: "white" }}
      />

      <Button
        id="login"
        color="primary"
        variant="contained"
        disabled={!validUsername().valid || !validPassword().valid}
        fullWidth
        style={{ margin: "12px 0" }}
        onClick={() => props.login(username, password)}
      > Sign In </Button>

      <div style={{display:"flex", flexDirection:"row"}}>
        <Link href="/register" variant="body2" style={{margin:"0 auto"}}>  Don't have an account? </Link>
        <Link href="/passwordreset" variant="body2" style={{margin:"0 auto "}}> Forgot password? </Link>
      </div>

    </div>
  </SmallWindowView>
}
