import React, { useState } from "react"
import SmallWindowView from "./SmallWindowView"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Dropdown from "./Dropdown"
import MultiDropdown from "./MultiDropdown"
import Button from "@material-ui/core/Button"
import SignatureDialog from "./SignatureDialog"

const GET_STEPTYPES = gql`{
  stepTypes {
    name
  }
}`

const GET_FORMS = gql`{
  forms {
    name
  }
}`

const GET_ROLES = gql`{
  roles {
    name
  }
}`

const CREATE_STEPTYPE = gql` mutation CreateStepType( $input: CreateStepTypeInput!) {
  createStepType(input: $input){
    id
  }
}`

export default props => {
  const [createStepType] = useMutation(CREATE_STEPTYPE, {
    onCompleted: () => props.changePage("/steps"),
    onError: error => { error.message === "Response not successful: Received status code 400"
      ? alert(`Error creating step: Not authorized`)
      : alert(`Error creating step: ${error}`)
    }
  })
  const StepTypes = useQuery(GET_STEPTYPES)
  const Forms = useQuery(GET_FORMS)
  const Roles = useQuery(GET_ROLES)
  const [dialogOpen, setDialogOpen] = useState(false)  
  const [name, setName] = useState(0)
  const [description, setDescription] = useState(0)
  const [instructions, setInstructions] = useState(0)
  const [form, setForm] = useState(0)
  const [requiredRoles, setRequiredRoles] = useState([])
  const [inputRefs, setInputRefs] = useState({name:0, description:0, instructions:0, form:0, requiredRoles:0})

  const handleSubmit = () => setDialogOpen(true)

  const handleDialogSubmit = (username, password) => {
    setDialogOpen(false)
    //TODO: use username and password ....
    createStepType({ input: { name, description, instructions, form, requiredRoles } })
  }

  const handleDialogCancel = () => setDialogOpen(false)

  const handleChange = event => {
    const { target: { id, value } } = event
    if (id === "name") setName(value)
    if (id === "description") setDescription(value)
    if (id === "instructions") setInstructions(value)
  }

  const validName = () => name.length > 2 &&
   (StepTypes.loading || !StepTypes.data.stepTypes.some( stepType => stepType.name === name ))
    ? { valid: true }
    : { error: "Please enter a valid name (A unique name with 3 or more characters)"}
  
  const validDescription = () => description.length > 9
    ? { valid: true }
    : { error: "Please enter a valid description (10 or more characters)"}

  const validInstructions = () => instructions.length > 9
    ? { valid: true }
    : { error: "Please enter valid instructions (10 or more characters"}

  const validForm = () => !form || Forms.loading || Forms.data.forms.some(foundForm => foundForm.name === form)
    ? { valid: true }
    : { error: "Please enter valid form (must exist) or no form"}

  const validRoles = () => requiredRoles.length === 0 || Roles.loading || 
   requiredRoles.every(rr => Roles.data.roles.some(r => r.name === rr.name))
    ? { valid: true }
    : { error: "Please enter valid roles (must exist) or no roles"}
    
  const validInput = validName().valid && validDescription().valid && validInstructions().valid && validForm().valid && validRoles().valid

  const focusNextInput = () => {
    if (!validName().valid) inputRefs.name.focus()
    else if (!validDescription().valid) inputRefs.description.focus()
    else if (!validInstructions().valid) inputRefs.instructions.focus()
    else if (!validForm().valid) inputRefs.form.focus()
    else if (!validRoles().valid) inputRefs.roles.focus()
  }

  const handleKeyPress = event => { if (event.key === "Enter")
    validInput ? handleSubmit() : focusNextInput()
  }

  return <SmallWindowView {...props} width="375px" pageName="Create Step Type">
    <div style={{ margin: "16px", textAlign: "center"}}>

      <Typography
          variant="h5"
          style={{ textAlign: "center", margin: "0 0 8px 0" }}
      > New Step Type </Typography>

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

      <TextField
        id="description"
        label="Enter description"
        required
        inputRef={ref => setInputRefs(Object.assign(inputRefs, {description: ref}))}
        variant="outlined"
        margin="dense"
        fullWidth
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        style={{ backgroundColor: "white" }}
      />

      <TextField
        id="instructions"
        label="Enter instructions"
        required
        inputRef={ref => setInputRefs(Object.assign(inputRefs, {instructions: ref}))}
        variant="outlined"
        margin="dense"
        fullWidth
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        style={{ backgroundColor: "white" }}
      />

      <Dropdown
        id="form"
        data={ Forms.data ? Forms.data.forms : []}
        idField="name"
        displayField="name"
        onSelect={ selection => {
          setForm(selection.name)
          focusNextInput()
        }}
        onKeyPress={ handleKeyPress }
        inputRef={ref => setInputRefs(Object.assign(inputRefs, {form: ref}))}
      />

      <MultiDropdown 
        id="roles"
        name="required roles"
        data={Roles.data ? Roles.data.roles : []}
        idField="name"
        displayField="name"
        selectedItem = {requiredRoles}
        setSelectedItem = {setRequiredRoles}
        inputRefs={ref => setInputRefs(Object.assign(inputRefs, {roles: ref}))}
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

      <Button id="cancel" variant="contained" fullWidth onClick={() => props.changePage("/steps")}
        style={{ margin: "8px 0" }}
      > Cancel </Button>

      <SignatureDialog open={dialogOpen} submit={handleDialogSubmit} cancel={handleDialogCancel} />

    </div>
  </SmallWindowView>
}