import React, { useState } from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
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
import Dropdown from "./Dropdown"
import MultiDropdown from "./MultiDropdown"

const GET_STEPTYPES = gql`{
  stepTypes {
    id
    name
  }
}`

export default props => {
  const { Part  } = props
  const StepTypes = useQuery(GET_STEPTYPES)
  const [stepType, setStepType] = useState(0)
  const [prevSteps, setPrevSteps] = useState([])
  const [inputRefs, setInputRefs] = useState({})
  const [username, setUsername] = useState(0)
  const [password, setPassword] = useState(0)
  const [showPassword, setShowPassword] = useState(false)

  const validStepType = () => stepType.length > 0 && !StepTypes.loading &&
   StepTypes.data.stepTypes.some(some => some.id === stepType.id)
    ? { valid: true }
    : { error: "Please enter a valid step type (Must exist)" }
 
  const validPrevSteps = () => prevSteps.length === 0 || !Part.loading &&
   prevSteps.every(prevStep => (Part.data.part.steps.some(step => step.stepType.id === prevStep.id)))
    ? { valid: true }
    : { error: "Please enter valid previous steps (None or all must exist)" }

  const validUsername = () => username.length > 0
    ? {valid: true}
    : {err: "Please enter a valid username (1 or more characters)"}

  const validPassword = () => password.length > 3
    ? {valid: true}
    : {err: "Please enter a valid username (4 or more characters)"}
  
  const validInput = validStepType().valid && validPrevSteps().valid && validUsername().valid && validPassword().valid

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

  const handleKeyDown = event => { if (event.key === "Enter")
    validInput ? props.submit(username, password) : focusNextInput()
  }

  const formatSteps = steps => steps.map(step => {return {name: step.stepType.name, id: step.id}})

  return <Dialog
    open={props.open}
    onClose={props.cancel}
    aria-labelledby="add-step-dialog-title"
    onEnter={() => {
      setUsername(0)
      setPassword(0)
      setStepType(0)
      setPrevSteps([])
    }}
    scroll="body"
  >
    <DialogTitle id="add-step-dialog-title"> Add Step To Part Process </DialogTitle>
    <DialogContent>

      <Dropdown
        name="step type"
        id={`stepType`}
        data={ StepTypes.data ? StepTypes.data.stepTypes : [] }
        displayField="name"
        clearOnClick
        onSelect={ selection => {
          setStepType(selection ? selection.name : "")
        }}
        onKeyDown={ handleKeyDown }
        inputRef={ref => setInputRefs(Object.assign(inputRefs, {stepType: ref}))}
      />

      <MultiDropdown 
        name="previous steps"
        id="previousSteps"
        data={Part.data ? formatSteps(Part.data.part.steps) : []}
        idField="id"
        displayField="name"
        selectedItem = {prevSteps}
        setSelectedItem = {setPrevSteps}
        onKeyDown={handleKeyDown}
        inputRefs={ref => setInputRefs(Object.assign(inputRefs, {prevSteps: ref}))}
      />

      <DialogContentText>
        To complete this action, please enter your username and password. This will act as your electronic signature.
      </DialogContentText>

      <TextField
        id="username"
        label="Enter Username"
        autoComplete="username"
        required
        inputRef={ref => { inputRefs.username = ref }}
        variant="outlined"
        margin="dense"
        fullWidth
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        style={{ backgroundColor: "white", margin:" 0" }}
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
        onKeyDown={handleKeyDown}
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
          onClick={() => {props.submit(stepType, prevSteps, username, password)}}
      > Add Step </Button>

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