import React, { useState } from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"
import SmallWindowView from "./SmallWindowView"
import SignatureDialog from "./SignatureDialog"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

const GET_CUSTOMERS = gql`
  {
    customers {
      name
    } 
  }
`

const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($name: String!) {
    createCustomer(name: $name) {
      id
    }
  }
`

export default props => {
  const [createCustomer, {data}] = useMutation(CREATE_CUSTOMER, {
    onCompleted: () => props.changePage("/customers"),
    onError: e => alert(`Error creating customer: ${e}`)
  })
  const Customers = useQuery(GET_CUSTOMERS)
  const [name, setName] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [inputRefs, setInputRefs] = useState({})

  const handleSubmit = () => {
    setDialogOpen(true)
  }

  const handleDialogSubmit = (username, password) => {
    setDialogOpen(false)
    createCustomer({variables: {validName}})
  }

  const handleDialogCancel = () => {
    setDialogOpen(false)
  }

  const handleChange = e => { 
    const { target: { id, value } } = e
    if (id === "name") setName(value)
  }

  const validName = () => name.length > 0
    ? {valid: true}
    : {err: "Please enter a valid name (Unique name with 1 or more characters)"}

  const validInput = validName().valid

  const focusNextInput = () => {
    if (!validName().valid) inputRefs.name.focus()
  }

  const handleKeyPress = e => { if (e.key === "Enter") 
    validInput ? handleSubmit() : focusNextInput()
  }

  return (
    <SmallWindowView {...props} pageName="Create Customer">
      <div
          style={{
            margin: "16px",
            width: "430px",
            maxWidth: "100vw",
            textAlign: "center"
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            style={{ textAlign: "center", margin: "0 0 8px 0" }}
          > New Customer </Typography>

          <TextField
            id="name"
            inputRef={ref => {setInputRefs(Object.assign(inputRefs, {name: ref}))}}
            label="Enter Name"
            variant="outlined"
            margin="dense"
            autoFocus
            required
            fullWidth
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            style={{backgroundColor: "white"}}
          />

          <Button
            id="create"
            color="primary"
            variant="contained"
            disabled={!validName().valid}
            fullWidth
            style={{margin: "12px 0"}}
            onClick={handleSubmit}
          > Create </Button>

          <Button
            id="cancel"
            variant="contained"
            fullWidth
            style={{margin: "0"}}
            onClick={() => props.changePage("/customers")}
          > Cancel </Button>

          <SignatureDialog open={dialogOpen} submit={handleDialogSubmit} cancel={handleDialogCancel} />

        </div>
    </SmallWindowView>
  )
}