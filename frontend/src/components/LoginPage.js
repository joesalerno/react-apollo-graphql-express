import React, { Component } from "react"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import IconButton from "@material-ui/core/IconButton"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import SmallWindowView from "./SmallWindowView"

export default class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    showPassword: false
  }

  handleChange = e => {
    const {
      target: { id, value }
    } = e
    this.setState({ [id]: value })
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }))
  }

  validPassword = () => {
    return {
      valid: this.state.password.length > 3,
      err:
        this.state.password.length > 3
          ? ""
          : "Please enter a valid username (4 or more characters)"
    }
  }

  validUsername = () => {
    return {
      valid: this.state.username.length > 0,
      err:
        this.state.username.length > 0
          ? ""
          : "Please enter a valid username (1 or more characters)"
    }
  }

  handleKeyPress = e => {
    if (e.key === "Enter") {
      if (!this.validUsername().valid) this.inputUsername.focus()
      else if (!this.validPassword().valid) this.inputPassword.focus()
      else this.props.login(this.state.username, this.state.password)
    }
  }

  render() {
    return (
      <SmallWindowView>
        <div style={{ margin: "16px" }}>
          <Avatar style={{ margin: "0 auto 4px auto" }}>
              <LockOutlinedIcon />
          </Avatar>
          <Typography
              component="h1"
              variant="h5"
              style={{ textAlign: "center", margin: "0 0 8px 0" }}
          >
              Sign in to TTM Production App
          </Typography>
          <TextField
              id="username"
              inputRef={ref => {
              this.inputUsername = ref
              }}
              label="Enter Username"
              variant="outlined"
              margin="dense"
              autoComplete="username"
              autoFocus
              required
              fullWidth
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange}
              style={{ backgroundColor: "white" }}
          />
          <br />
          <TextField
              id="password"
              inputRef={ref => {
              this.inputPassword = ref
              }}
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
              endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.handleClickShowPassword}>
                      {this.state.showPassword 
                      ? (<Visibility />)
                      : (<VisibilityOff />)}
                    </IconButton>
                  </InputAdornment>
              )
              }}
              style={{ backgroundColor: "white" }}
          />
          <br />
          <Button
              id="login"
              color="primary"
              variant="contained"
              disabled={
              !this.validUsername().valid || !this.validPassword().valid
              }
              fullWidth
              style={{ margin: "12px 0" }}
              onClick={() => this.props.login(this.state.username, this.state.password)}
          >
              Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/passwordreset" variant="body2"> Forgot password? </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">  Don't have an account?{" "} </Link>
            </Grid>
          </Grid>
        </div>
      </SmallWindowView>
    )
  }
}
