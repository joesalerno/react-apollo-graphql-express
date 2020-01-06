import {useState} from "react"
import { NoSsr, TextField, Typography, Avatar, IconButton, Button, InputAdornment } from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import TTMLogo from "../public/ttmvectorlogoblue.svg"
import "./LoginPage.scss"

const LoginPage = ({login, session}) => {
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

  const focusNextInput = () => {
    if (!validUsername().valid) inputRefs.username.focus()
    else if (!validPassword().valid) inputRefs.password.focus()
  }

  const handleKeyDown = event => { if (event.key === "Enter")
    validInput ? Login(username, password) : focusNextInput()
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  return <div className="LoginPage">
    
    <NoSsr>
      <div style={{height: "84px", width: "500px", margin: "auto auto 30px auto"}}>
        <div className="Logo" style={{
          background: `url(${TTMLogo})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "84px",
          width: "500px"
        }}/>
      </div>

      <Avatar> <LockOutlinedIcon/> </Avatar>

      <Typography
        component="h1"
        variant="h5"
        style={{ textAlign: "center", margin: "8px 0px 30px 0px" }}
      > Login </Typography>

      <TextField
        id="username"
        inputRef={ref => { inputRefs.username = ref }}
        label="Enter Username"
        variant="outlined"
        margin="dense"
        autoComplete="username"
        autoFocus
        required
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        style={{ backgroundColor: "white", margin:"5px", width: "250px" }}
      />

      <TextField
        id="password"
        inputRef={ref => { inputRefs.password = ref }}
        label="Enter Password"
        variant="outlined"
        margin="dense"
        autoComplete="password"
        required
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        InputProps={{ type: showPassword ? "text" : "password",
          endAdornment: <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <Visibility/>: <VisibilityOff/>}
            </IconButton>
          </InputAdornment>
        }}
        style={{ backgroundColor: "white", margin:"5px", width: "250px" }}
      />
      
      <Button
        id="login"
        color="primary"
        variant="contained"
        disabled={!validUsername().valid || !validPassword().valid}
        onClick={() => (login(username, password))}
        style={{ margin:"8px 5px 8px 5px", width: "250px" }}
      > Login </Button>

      <div style={{width:"250px", display:"flex", justifyContent:"space-around", margin:"0 auto auto auto"}}>
        <a href="/">Register</a>
        <a href="/">Forgot Password</a>
      </div>

    </NoSsr>
  </div>
}

export default LoginPage