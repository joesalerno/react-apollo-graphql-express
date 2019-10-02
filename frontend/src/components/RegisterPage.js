import React, { Component } from "react"
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

export default class RegisterPage extends Component {
  state = {
    employeeId: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
  }

  handleChange = e => {
    const { target: { id, value } } = e
    this.setState({ [id]: value })
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }))
  }

  validEmployeeId = () => {
    return {
      valid: this.state.employeeId.length > 0,
      err: this.state.employeeId.length > 0 ? "" : "Please enter a valid employee ID (1 or more characters)"
    }
  }

  validUsername = () => {
    return {
      valid: this.state.username.length > 0,
      err: this.state.username.length > 0 ? "" : "Please enter a valid username (1 or more characters)"
    }
  }

  validEmail = () => {
    return {
      valid: this.state.email.length > 0,
      err: this.state.email.length > 0 ? "" : "Please enter a valid username (1 or more characters)"
    }
  }

  validPassword = () => {
    return {
      valid: this.state.password.length > 3,
      err: this.state.password.length > 3 ? "" : "Please enter a valid username (4 or more characters)"
    }
  }

  handleKeyPress = e => {
    if (e.key === "Enter") {
      if (!this.validEmployeeId().valid) this.inputEmployeeId.focus()
      else if (!this.validUsername().valid) this.inputUsername.focus()
      else if (!this.validEmail().valid) this.inputEmail.focus()
      else if (!this.validPassword().valid) this.inputPassword.focus()
      else this.props.register(this.state.username, this.state.email, this.state.password, this.state.employeeId)
    }
  }

  render() {
    return (
      <SmallWindowView {...this.props} pageName="Register">
        <div style={{ margin: "16px", textAlign: "center", maxWidth: "500px",}}>
        <Avatar style={{ margin: "0 auto 4px auto" }}><PersonAddOutlinedIcon/></Avatar>
        <Typography component="h1" variant="h5" style={{margin: "16px"}}>
            Register for TTM Production App
        </Typography>
        <TextField 
          id="employeeId"
          inputRef = {(ref) => {this.inputEmployeeId = ref}}
          label="Enter TTM ID" 
          variant="outlined" 
          margin="dense"
          autoComplete="employeeId"
          autoFocus
          required
          fullWidth
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}
          style={{backgroundColor: "white"}}
        />
        <TextField 
          id="username"
          inputRef = {(ref) => {this.inputUsername = ref}}
          label="Enter Username" 
          variant="outlined" 
          margin="dense"
          autoComplete="username"
          required
          fullWidth
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}
          style={{backgroundColor: "white"}}
        />
        <TextField 
          id="email"
          inputRef = {(ref) => {this.inputEmail = ref}}
          label="Enter Email" 
          variant="outlined" 
          margin="dense"
          autoComplete="email"
          required
          fullWidth
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}
          style={{backgroundColor: "white"}}
        />
        <br />
        <TextField 
          id="password"
          inputRef = {(ref) => {this.inputPassword = ref}} 
          label="Enter Password" 
          variant="outlined" 
          margin="dense"
          autoComplete="password"
          required
          fullWidth
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}  
          InputProps={{
          type: this.state.showPassword ? "text" : "password",
          endAdornment: (<InputAdornment position="end">
            <IconButton onClick={this.handleClickShowPassword}>
            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>)
          }}
          style={{backgroundColor: "white"}}
        />
        <br />
        <Button 
          id="login"
          color="primary"
          variant="contained"
          disabled={!this.validEmployeeId().valid || !this.validUsername().valid || !this.validEmail().valid || !this.validPassword().valid}
          fullWidth
          style={{margin: "12px 0"}}
          onClick={() => this.props.register(this.state.username, this.state.email, this.state.password, this.state.employeeId)}
        > Register </Button>
        <Link href="/" variant="body2"> Already have an account? </Link>
      </div>
      </SmallWindowView>
    )
  }
}