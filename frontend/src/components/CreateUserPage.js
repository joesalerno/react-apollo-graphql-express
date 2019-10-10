import React, { useState } from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"
import SmallWindowView from "./SmallWindowView"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import SignatureDialog from "./SignatureDialog"

const GET_USERS = gql` {
  users {
    username
    employeeId
    email
  } 
}`

const CREATE_USER = gql` mutation CreateUser( $input: CreateUserInput!) {
  createUser(input: $input) {
    id
  }
}`

export default props => {
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => props.changePage("/users"),
    onError: error => { error.message === "Response not successful: Received status code 400"
      ? alert(`Error creating user: Not authorized`)
      : alert(`Error creating user: ${error}`)
    }
  })
  const Users = useQuery(GET_USERS)
  const [dialogOpen, setDialogOpen] = useState(false)  
  const [username, setUsername] = useState(0)
  const [employeeId, setEmployeeId] = useState(0)
  const [email, setEmail] = useState(0)
  const [password, setPassword] = useState(0)
  const [inputRefs, setInputRefs] = useState({})

  const handleSubmit = () => setDialogOpen(true)

  const handleDialogSubmit = (user, pass) => {
    setDialogOpen(false)
    //TODO: use username and password ....
    createUser({ variables: { input: {username, employeeId, email, password}} })
  }

  const handleDialogCancel = () => setDialogOpen(false)

  const handleChange = event => {
    const { target: { id, value } } = event
    if (id === "username") setUsername(value)
    if (id === "employeeId") setEmployeeId(value)
    if (id === "email") setEmail(value)
    if (id === "password") setPassword(value)
  }

  const validUsername = () => username.length > 0 &&
   (Users.loading || !Users.data.users.some( user => user.username === username ))
    ? { valid: true }
    : { error: "Please enter a valid name (A unique name with 1 or more characters)"}
  
  const validEmployeeId = () => employeeId.length > 0 &&
   (Users.loading || !Users.data.users.some( user => user.employeeId === employeeId ))
    ? { valid: true }
    : { error: "Please enter a valid employee id (A unique id with 1 or more characters)"}
  
  const validEmail = () => email.length > 0 &&
   (Users.loading || !Users.data.users.some( user => user.email === email ))
    ? { valid: true }
    : { error: "Please enter a valid email (A unique email address with 1 or more characters)"}
  
  const validPassword = () => password.length > 3
    ? { valid: true }
    : { error: "Please enter a valid password (4 or more characters)"}

  const validInput = validUsername().valid && validEmployeeId().valid && validEmail().valid && validPassword().valid

  const focusNextInput = () => {
    if (!validUsername().valid) inputRefs.username.focus()
    else if (!validEmployeeId().valid) inputRefs.employeeId.focus()
    else if (!validEmail().valid) inputRefs.email.focus()
    else if (!validPassword().valid) inputRefs.password.focus()
  }

  const handleKeyPress = event => { if (event.key === "Enter")
    validInput ? handleSubmit() : focusNextInput()
  }

  return <SmallWindowView {...props} width="375px" pageName="Create User">
    <div style={{ margin: "16px", textAlign: "center"}}>

      <Typography variant="h5"
        style={{ textAlign: "center", margin: "0 0 8px 0" }}
      > New User </Typography>

      <TextField
        id="username"
        label="Enter username"
        autoFocus
        required
        inputRef={ref => setInputRefs(Object.assign(inputRefs, {username: ref}))}
        variant="outlined"
        margin="dense"
        fullWidth
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        style={{ backgroundColor: "white" }}
      />

      <TextField
        id="employeeId"
        label="Enter employeeId"
        autoFocus
        required
        inputRef={ref => setInputRefs(Object.assign(inputRefs, {employeeId: ref}))}
        variant="outlined"
        margin="dense"
        fullWidth
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        style={{ backgroundColor: "white" }}
      />

      <TextField
        id="email"
        label="Enter email"
        autoFocus
        required
        inputRef={ref => setInputRefs(Object.assign(inputRefs, {email: ref}))}
        variant="outlined"
        margin="dense"
        fullWidth
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        style={{ backgroundColor: "white" }}
      />

      <TextField
        id="password"
        label="Enter password"
        autoFocus
        required
        inputRef={ref => setInputRefs(Object.assign(inputRefs, {password: ref}))}
        variant="outlined"
        margin="dense"
        fullWidth
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        style={{ backgroundColor: "white" }}
      />

      <Button
        id="create"
        color="primary"
        variant="contained"
        disabled={ !validInput }
        fullWidth
        style={{ margin: "12px 0" }}
        onClick={handleSubmit}
      > Create </Button>

      <Button id="cancel" variant="contained" fullWidth onClick={() => props.changePage("/users")}
        style={{ margin: "8px 0" }}
      > Cancel </Button>

      <SignatureDialog open={dialogOpen} submit={handleDialogSubmit} cancel={handleDialogCancel} />

    </div>
  </SmallWindowView>
}
