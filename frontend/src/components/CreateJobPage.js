import React, { Fragment } from "react"
import Background from "./Background"
import NavBar from "./NavBar"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"


export default props => {
  return (
    <Background>
      <Fragment>
          <NavBar {...props} pageName="Create Job" />
          <Paper style={{ flex: "auto", margin: "8px", opacity: "0.95" }}>
            
          </Paper>
        </Fragment>
    </Background>
  )
}
