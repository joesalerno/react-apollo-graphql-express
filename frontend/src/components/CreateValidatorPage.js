import React, { useState } from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"
import SmallWindowView from "./SmallWindowView"
import SignatureDialog from "./SignatureDialog"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Dropdown from "./Dropdown"

const GET_VALIDATOR_MODULES = gql`{
  validatorModules {
    fileName
    validator {
      id
    }
  }
}`

const CREATE_VALIDATOR = gql` mutation CreateValidator($input: CreateValidatorInput!) {
  createValidator(input: $input) {
    id
  }
}`

export default props => {
  const [createValidator] = useMutation(CREATE_VALIDATOR, {
    onCompleted: () => props.changePage("/validators"),
    onError: error => { error.message === "Response not successful: Received status code 400"
      ? alert(`Error creating validator: Not authorized`)
      : alert(`Error creating validator: ${error}`)
    }
  })
  const ValidatorModules = useQuery(GET_VALIDATOR_MODULES)
  const [moduleName, setModuleName] = useState("")
  const [description, setDescription] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [inputRefs, setInputRefs] = useState({})

  const handleSubmit = () => setDialogOpen(true)

  const handleDialogSubmit = (username, password) => {
    setDialogOpen(false)
    //TODO: use username and password ....
    createValidator({ variables: { moduleName, description } })
  }

  const handleDialogCancel = () => setDialogOpen(false)

  const handleChange = event => {
    const { target: { id, value } } = event
    if (id === "description") setDescription(value)
  }

  const validDescription = () => description.length > 9
    ? { valid: true }
    : { error: "Please enter a valid description (10 or more characters)"}

  const validModuleName = () => {
    return ValidatorModules.loading || ValidatorModules.data.validatorModules.some( validatorModule =>
      validatorModule.fileName === moduleName && validatorModule.validator === null
    )
      ? { valid: true }
      : { error: "Please enter a valid module name (must be an unused module in /validators directory)" }
  }

  const validInput = validDescription().valid && validModuleName().valid 

  const focusNextInput = () => {
    if (!validDescription().valid) inputRefs.description.focus()
    else if (!validModuleName().valid) inputRefs.moduleName.focus()
  }

  const handleKeyDown = event => { if (event.key === "Enter")
    validInput ? handleSubmit() : focusNextInput()
  }

  return <SmallWindowView {...props} pageName="Create Validator">
    <div style={{ margin: "8px", textAlign: "center"}}>
      <Typography
        variant="h5"
        style={{ textAlign: "center", margin: "0 0 8px 0" }}
      > New Validator </Typography>

      <TextField
        id="description"
        label="Enter description"
        autoFocus
        required
        inputRef={ref => setInputRefs(Object.assign(inputRefs, {description: ref}))}
        variant="outlined"
        margin="dense"
        fullWidth
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        style={{ backgroundColor: "white" }}
      />

      <Dropdown
        id="module"
        data={ ValidatorModules.data ? ValidatorModules.data.validatorModules : [] }
        idField="fileName"
        displayField="fileName"
        filter={item => item.validator === null}
        clearOnClick
        onSelect={ selection => {
          setModuleName( selection.fileName )
          focusNextInput()
        }}
        onKeyDown={ handleKeyDown }
        inputRef={ref => setInputRefs(Object.assign(inputRefs, {moduleName: ref}))}
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

      <Button id="cancel" variant="contained" fullWidth onClick={() => props.changePage("/validators")}
        style={{ margin: "16px 0" }}
      > Cancel </Button>

      <SignatureDialog open={dialogOpen} submit={handleDialogSubmit} cancel={handleDialogCancel} />
    </div>
  </SmallWindowView>
}