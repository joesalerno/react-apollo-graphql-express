import {useState} from "react"
import { NoSsr, TextField, Typography, Avatar, IconButton, Button, InputAdornment } from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import TTMLogo from "./TTMTechnologiesLogo"
import BasicLayout from "./BasicLayout"
import "./LoginPage.css"

const LoginPage = ({login, logout, user}) => {
  //------------------------- Initialize Component -----------------------------
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(0)
  const inputRefs = {}

  const focusNextInput = () => {
    if (!validUsername().valid) inputRefs.username.focus()
    else if (!validPassword().valid) inputRefs.password.focus()
  }

  const validUsername = () => username.length > 0
    ? {valid: true}
    : {err: "Please enter a valid username (1 or more characters)"}

  const validPassword = () => password.length > 3
    ? {valid: true}
    : {err: "Please enter a valid username (4 or more characters)"}

  const validInput = validUsername().valid && validPassword().valid

  const handleChange = event => {
    const { target: { id, value } } = event
    if (id === "username") setUsername(value)
    if (id === "password") setPassword(value)
  }

  const handleKeyDown = event => { 
    if (event.key === "Enter") validInput ? login(username, password) : focusNextInput()
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  //-------------------------------- Render ------------------------------------
  return <BasicLayout user={user} logout={logout}>
    <div className="LoginPage">  
      <NoSsr>

        <TTMLogo style={{
          height: "84px",
          width: "500px",
          maxWidth: "100%",
          margin: "auto auto 30px auto"
        }}/>

        <Avatar> <LockOutlinedIcon/> </Avatar>

        <Typography
          component="h1"
          variant="h5"
          style={{ textAlign: "center", margin: "8px 0px 38px 0px" }}
        > CAM Login </Typography>

        <TextField
          value={username}
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
          value={password}
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
                {showPassword ? <Visibility/> : <VisibilityOff/>}
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
          onClick={() => login(username, password)}
          style={{ margin:"8px 5px 8px 5px", width: "250px" }}
        > Login </Button>

        <div className="Links">
          <a href="/">Register</a>
          <a href="/">Forgot Password</a>
        </div>

      </NoSsr>
    </div>
  </BasicLayout>
}

export default LoginPage