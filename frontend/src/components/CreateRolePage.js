import React, { useState } from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"
import SmallWindowView from "./SmallWindowView"
import SignatureDialog from "./SignatureDialog"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import MultiDropdown from "./MultiDropdown"

const GET_ROLES = gql` {
  roles {
    name
  }
}`

const GET_USERS = gql` {
  users {
    id
    username
  }
}`

const CREATE_ROLE = gql` mutation CreateRole($input: CreateRoleInput!) {
  createRole(input: $input) {
    id
  }
}`

export default props => {
  const [createRole] = useMutation(CREATE_ROLE, {
    onCompleted: () => props.changePage("/roles"),
    onError: error => { error.message === "Response not successful: Received status code 400"
      ? alert(`Error creating role: Not authorized`)
      : alert(`Error creating role: ${error}`)
    }
  })
  const Roles = useQuery(GET_ROLES)
  const Users = useQuery(GET_USERS)
  const [name, setName] = useState("")
  const [users, setUsers] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [inputRefs, setInputRefs] = useState({})

  const handleSubmit = () => setDialogOpen(true)

  const handleDialogSubmit = (username, password) => {
    setDialogOpen(false)

    var userIds = []
    for (var user of users) {
      userIds.push(user.id)
    }
    
    //TODO: use username and password ....
    createRole({variables: userIds.length > 0 ? {name, users: userIds} : {name}})
  }

  const handleDialogCancel = () => setDialogOpen(false)

  const handleChange = event => {
    const { target: { id, value } } = event
    if (id === "name") setName(value)
  }

  const validName = () => {
    if (!Roles.loading && Roles.data)
      for(var role of Roles.data.roles){
        if (role.name.toLowerCase() === name.toLowerCase())
          return {error: "Please enter a unique role name"}
      }
    return name.length > 0
      ? {valid: true}
      : {error: "Please enter a valid name (Unique name with 1 or more characters)"}
  }
  
  const validUsers = () => {
    return Users.loading || users.length < 1 || users.some(userId => !Users.data.users.some(user => user.id === userId))
      ? {valid: true}
      : {error: "User ID not found"}
  }

  const validInput = validName().valid && validUsers().valid

  const focusNextInput = () => {
    if (!validName().valid) inputRefs.name.focus()
    else if (!validUsers().valid) inputRefs.users.focus()
  }

  const handleKeyPress = event => { if (event.key === "Enter")
    validInput ? handleSubmit() : focusNextInput()
  }

  return <SmallWindowView {...props} pageName="Create Role">
    <div style={{ margin: "16px", textAlign: "center" }}>
      <Typography
        variant="h5"
        style={{ textAlign: "center", margin: "0 0 8px 0" }}
      > New Role </Typography>

      <TextField
        id="name"
        label="Enter name"
        autoFocus
        required
        inputRef={ref => setInputRefs(Object.assign(inputRefs, {name: ref}))}
        variant="outlined"
        margin="dense"
        fullWidth
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        style={{ backgroundColor: "white" }}
      />

      <MultiDropdown 
        id="users"
        data={Users.data ? Users.data.users : []}
        idField="username"
        displayField="username"
        selectedItem = {users}
        setSelectedItem = {setUsers}
        inputRefs={ref => setInputRefs(Object.assign(inputRefs, {users: ref}))}
        onSelect={focusNextInput}
        onKeyPress={handleKeyPress}
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

      <Button id="cancel" variant="contained" fullWidth onClick={() => props.changePage("/roles")}
        style={{ margin: "8px 0" }}
      > Cancel </Button>

      <SignatureDialog open={dialogOpen} submit={handleDialogSubmit} cancel={handleDialogCancel} />
    </div>
  </SmallWindowView>
}