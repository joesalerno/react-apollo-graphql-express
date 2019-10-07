import React from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

export default props => {
  const [username, setUsername] = React.useState(0)
  const [password, setPassword] = React.useState(0)
  const [showPassword, setShowPassword] = React.useState(false)

  const validUsername = () => username.length > 0
    ? {valid: true}
    : {err: "Please enter a valid username (1 or more characters)"}

  const validPassword = () => password.length > 3
    ? {valid: true}
    : {err: "Please enter a valid username (4 or more characters)"}
  
  const validInput = validUsername().valid && validPassword().valid

  const inputRefs = {}

  const focusNextInput = () => {
    if (!validUsername().valid) inputRefs.username.focus()
    else if (!validPassword().valid) inputRefs.password.focus()
  }

  const handleChange = event => {
    const { target: { id, value } } = event
    if (id === "username") setUsername(value)
    if (id === "password") setPassword(value)
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleKeyPress = event => { if (event.key === "Enter")
    validInput ? props.submit(username, password) : focusNextInput()
  }

  return <Dialog
    open={props.open}
    onClose={props.cancel}
    aria-labelledby="signature-dialog-title"
    onEnter={() => {
      setUsername(0)
      setPassword(0)
    }}
    
  >
    <DialogTitle id="signature-dialog-title"> Signature required </DialogTitle>
    <DialogContent>

      <DialogContentText>
        To complete this action, please enter your username and password. This will act as your electronic signature.
      </DialogContentText>

      <TextField
        id="username"
        label="Enter Username"
        autoFocus
        autoComplete="username"
        required
        inputRef={ref => { inputRefs.username = ref }}
        variant="outlined"
        margin="dense"
        fullWidth
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        style={{ backgroundColor: "white", margin:"8px 0" }}
      />

      <TextField
        id="password"
        label="Enter Password"
        autoComplete="password"
        required
        inputRef={ref => { inputRefs.password = ref }}
        variant="outlined"
        margin="dense"
        fullWidth
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        InputProps={{ type: showPassword ? "text" : "password",
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword 
                ? (<Visibility />)
                : (<VisibilityOff />)}
              </IconButton>
            </InputAdornment>
          )
        }}
        style={{ backgroundColor: "white", margin:"8px 0"  }}
      />

      <Button
          id="sign"
          color="primary"
          variant="contained"
          disabled={ !validUsername().valid || !validPassword().valid }
          fullWidth
          style={{ margin: "8px 0" }}
          onClick={() => {props.submit(username, password)}}
      > Confirm </Button>

      <Button
          id="cancel"
          variant="contained"
          fullWidth
          style={{ margin: "8px 0" }}
          onClick={props.cancel}
      > Cancel </Button>

    </DialogContent>
  </Dialog>
}