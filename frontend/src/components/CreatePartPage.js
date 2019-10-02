import React, { useState } from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"
import SmallWindowView from "./SmallWindowView"
import Dropdown from "./Dropdown"
import SignatureDialog from "./SignatureDialog"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

const GET_CUSTOMERS = gql` {
  customers {
    name
  }
}
`
const CREATE_PART = gql`
  mutation CreatePart($name: String!, $customer: String!) {
    createPart(name: $name, customer: $customer) {
      id
    }
  }
`
export default props => {
  const [createPart, {data}] = useMutation(CREATE_PART, {
    onCompleted: () => props.changePage("/parts"),
    onError: e => alert(`Error creating part: ${e}`)
  })
  const Customers = useQuery(GET_CUSTOMERS)
  const [customer, setCustomer] = useState(0)
  const [name, setName] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [inputRefs, setInputRefs] = useState({})

  const handleSubmit = () => {
    setDialogOpen(true)
  }

  const handleDialogSubmit = (username, password) => {
    setDialogOpen(false)
    createPart({variables: {name, customer}})
  }

  const handleDialogCancel = () => {
    setDialogOpen(false)
  }

  const handleChange = e => {
    const { target: { id, value } } = e
    if (id === "name") setName(value)
    if (id === "customer") setCustomer(value)
  }

  const validName = () => name.length > 0
   ? {valid: true}
   : "Please enter a valid name (Unique name with 1 or more characters)"

  const validCustomer = () => customer.length > 0 
    ? {valid: true}
    : {err: "Please enter a valid customer" }

  const validInput = validName().valid && validCustomer().valid

  const focusNextInput = () => {
    if (!validName().valid) inputRefs.name.focus()
    else if (!validCustomer().valid) inputRefs.customer.focus()
  }

  const handleKeyPress = e => { if (e.key === "Enter")
    validInput ? handleSubmit() : focusNextInput()
  }

  return (
    <SmallWindowView {...props} pageName="Create Part">
      <div style={{
          margin: "16px",
          width: "430px",
          maxWidth: "100vw",
          textAlign: "center"
        }}>
          <Typography
            variant="h5"
            style={{ textAlign: "center", margin: "0 0 8px 0" }}
          > New Part </Typography>

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

          <Dropdown
            id="customer"
            query={Customers}
            displayField="name"
            onSelect={ selection => {
              setCustomer(selection.name)
              focusNextInput()
            }}
            handleKeyPress={handleKeyPress}
            inputRef={ref => setInputRefs(Object.assign(inputRefs, {customer: ref}))}
          />

          <Button
            id="create"
            color="primary"
            variant="contained"
            disabled={ !validName().valid || !validCustomer().valid }
            fullWidth
            style={{ margin: "12px 0" }}
            onClick={handleSubmit}
          > Create </Button>

          <Button id="cancel" variant="contained" fullWidth onClick={() => props.changePage("/parts")}
            style={{ margin: "8px 0" }}
          > Cancel </Button>

          <SignatureDialog open={dialogOpen} submit={handleDialogSubmit} cancel={handleDialogCancel} />

        </div>
    </SmallWindowView>
  )
}