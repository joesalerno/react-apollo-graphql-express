import React, { useState } from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"
import isValidRegex from "../modules/isValidRegEx"
import SmallWindowView from "./SmallWindowView"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Dropdown from "./Dropdown"
import Button from "@material-ui/core/Button"
import SignatureDialog from "./SignatureDialog"

const GET_FORMS = gql`{
  forms {
    name
  }
}`

const GET_VALIDATORS = gql`{
  validators {
    moduleName
    description
    enabled
  }
}`

const CREATE_FORM = gql` mutation CreateForm ( $input: CreateFormInput! ) {
  createForm(input: $input) {
    id
  }
}`

export default props => {
  const [createForm] = useMutation(CREATE_FORM, {
    onCompleted: () => props.changePage("/forms"),
    onError: error => { error.message === "Response not successful: Received status code 400"
      ? alert(`Error creating form: Not authorized`)
      : alert(`Error creating form: ${error}`)
    }
  })
  const Forms = useQuery(GET_FORMS)
  const Validators = useQuery(GET_VALIDATORS)
  const [dialogOpen, setDialogOpen] = useState(false)  
  const [name, setName] = useState(0)
  const [description, setDescription] = useState(0)
  const [data, setData] = useState([{instructions:"", regEx:"", validator:""}])
  const [increment, forceUpdate] = useState(0) //forceUpdate(increment+1) because React doesn't see changes to arrays in objects? is there a functional component version of shouldComponentUpdate()?
  const [inputDataRefs, setInputDataRefs] = useState([{instructions:0, regEx:0, validator:0}])
  const [inputRefs, setInputRefs] = useState({name:0, description:0})

  const handleAddInput = () => {
    setInputDataRefs([...inputDataRefs, {instructions:0, regEx:0, validator:0}])
    setData([...data, {instructions: "", regEx: "", validator: ""}])
    forceUpdate(increment+1)
  }

  const handleRemoveInput = index => {
    setInputDataRefs(inputDataRefs.filter((item, i) => i !== index))
    setData(data.filter((item, i) => i !== index))
    forceUpdate(increment+1)
  }

  const handleSubmit = () => setDialogOpen(true)

  const handleDialogSubmit = (username, password) => {
    setDialogOpen(false)
    //TODO: use username and password ....
    createForm({ variables: { input: {name, description, data} } })
  }

  const handleDialogCancel = () => setDialogOpen(false)

  const handleChange = event => {
    const { target: { id, value } } = event
    if (id === "name") setName(value)
    if (id === "description") setDescription(value)
    if (id.includes("instructions")) {
      const newData = data
      newData[id[id.length-1]].instructions = value
      setData(newData)
      forceUpdate(increment+1)
    }
    if (id.includes("regEx")) {
      const newData = data
      newData[id[id.length-1]].regEx = value
      setData(newData)
      forceUpdate(increment+1)
    }
  }

  const validName = () => name.length > 3 &&
   (Forms.loading || !Forms.data.forms.some( form => form.name === name ))
    ? { valid: true }
    : {error: "Please enter a valid name (A unique name with 3 or more characters)"}

  const validDescription = () => description.length > 9
    ? { valid: true }
    : { error: "Please enter a valid description (10 or more characters)"}

  const validInstructions = instructions => instructions.length > 9
    ? { valid: true }
    : { error: "Instruction input is not valid (10 or more characters"}

  const validRegEx = regEx => !regEx || isValidRegex(regEx)
    ? { valid: true }
    : { error: "Regex input is not valid (must compile)"}

  const validValidator = validator => !validator || Validators.loading ||
    Validators.data.validators.some(validator => validator.moduleName === validator && validator.enabled)
    ? { valid: true }
    : { error: "Validator input is not valid (must exist and be enabled)"}

  const validData = () => {
    if (data.length < 1) return { error: "Form must have at least one data input" }
    for (var dataItem of data) {
      if (validInstructions(dataItem.instructions).error) return validInstructions(dataItem.instructions).error
      if (validRegEx(dataItem.regEx).error) return validRegEx(dataItem.regEx).error
      if (validValidator(dataItem.validator).error) return validValidator(dataItem.validator).error
    }
    return { valid: true }
  }

  const validInput = validName().valid && validDescription().valid && validData().valid

  const focusNextInput = () => {
    if (!validName().valid) inputRefs.name.focus()
    else if (!validDescription().valid) inputRefs.description.focus()
    else {
      console.log("hi")
      for (var [index, dataItem] of data.entries())
      console.log(`index ${index}`)
      console.log(`dataItem`)
      console.log(dataItem)

        if(!validInstructions(dataItem.instructions).valid) inputDataRefs[index].instructions.focus()
        if(!validRegEx(dataItem.regEx).valid) inputDataRefs[index].regEx.focus()
        if(!validValidator(dataItem.validator).valid) inputDataRefs[index].regEx.focus()
    }
  }

  const handleKeyPress = event => { if (event.key === "Enter")
    validInput ? handleSubmit() : focusNextInput()
  }

  return <SmallWindowView {...props} width="485px" pageName="Create Form">
    <div style={{
      margin: "16px",
      textAlign: "center"
    }}>
      <Typography
        variant="h5"
        style={{ textAlign: "center", margin: "0 0 8px 0" }}
      > New Form </Typography>

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
      
      {data.map((dataItem, index) => <div key={index} style={{
        borderStyle:"outset",
        borderWidth:"2px",
        borderRadius:"4px",
        borderColor:"#0009",
        margin: "8px 0 0 0",
        padding:"16px"
      }}> 
        <Typography
          key={`header${index}`}
          variant="h6"
          style={{ textAlign: "center" }}
        > {`Form Input #${index+1}`} </Typography>

        <Button
          id={`removeButton${index}`}
          key={`removeButton${index}`}
          color="secondary"
          variant="contained"
          fullWidth
          style={{ margin: "8px 0", display: data.length === 1 && index + 1 >= data.length ? "none" : null }}
          onClick={() => handleRemoveInput(index)}
        > Remove this input </Button>

        <TextField
          id={`instructions${index}`}
          key={`instructions${index}`}
          label="Enter instructions"
          value={data[index].instructions}
          required
          inputRef={ref => {
            const newRefs = inputDataRefs
            newRefs[index].instructions = ref
            setInputDataRefs(newRefs)
          }}
          variant="outlined"
          margin="dense"
          fullWidth
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          style={{ backgroundColor: "white" }}
        />

        <TextField
          id={`regEx${index}`}
          key={`regEx${index}`}
          label="Enter regular expression"
          value={data[index].regEx}
          inputRef={ref => { 
            const newRefs = inputDataRefs
            newRefs[index].regEx = ref
            setInputDataRefs(newRefs)
          }}
          variant="outlined"
          margin="dense"
          fullWidth
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          style={{ backgroundColor: "white" }}
        />

        <Dropdown
          name="validator"
          id={`validator${index}`}
          key={`validator${index}`}
          value={data[index].validator}
          data={ Validators.data ? Validators.data.validators : [] }
          idField="moduleName"
          displayField="moduleName"
          filter={item => item.enabled === true}
          onSelect={ selection => {
            const newData = data
            newData[index].validator = selection.moduleName
            setData(newData)
            forceUpdate(increment+1)
            focusNextInput()
          }}
          onKeyPress={ handleKeyPress }
          inputRef={ref => { 
            const newRefs = inputDataRefs
            newRefs[index].validator = ref
            setInputDataRefs(newRefs)
          }}
        />

        <Button
          id={`newButton${index}`}
          key={`newButton${index}`}
          color="primary"
          variant="contained"
          fullWidth
          style={{ margin: "12px 0 0 0", display: index + 1 < data.length ? "none" : null }}
          onClick={handleAddInput}
        > Add another input </Button>
      </div>)}

      <Button
        id="create"
        color="primary"
        variant="contained"
        disabled={ !validInput }
        fullWidth
        style={{ margin: "12px 0" }}
        onClick={handleSubmit}
      > Create </Button>

      <Button id="cancel" variant="contained" fullWidth onClick={() => props.changePage("/forms")}
        style={{ margin: "8px 0" }}
      > Cancel </Button>

      <SignatureDialog open={dialogOpen} submit={handleDialogSubmit} cancel={handleDialogCancel} />

    </div>
  </SmallWindowView>
}