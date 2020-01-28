import React, { useState } from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"
import SmallWindowView from "./SmallWindowView"
import Dropdown from "./Dropdown"
import SignatureDialog from "./SignatureDialog"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import { requiredSubselectionMessage } from "graphql/validation/rules/ScalarLeafs"
import { maxWidth } from "@material-ui/system"

const GET_CUSTOMERS = gql` {
  customers {
    name
  }
}`

const CREATE_PART = gql` mutation CreatePart($input: CreatePartInput!) {
  createPart(input: $input) {
    id
  }
}`

export default props => {
  const [createPart] = useMutation(CREATE_PART, {
    onCompleted: () => props.changePage("/parts"),
    onError: error => alert(`Error creating part: ${error}`)
  })
  const Customers = useQuery(GET_CUSTOMERS)
  const [customer, setCustomer] = useState(0)
  const [name, setName] = useState(0)
  const [image, setImage] = useState(0)
  const [blueprint, setBlueprint] = useState(0)
  const [blueprintName, setBlueprintName] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [inputRefs, setInputRefs] = useState({})

  const handleSubmit = () => setDialogOpen(true)

  const handleDialogSubmit = (username, password) => {
    setDialogOpen(false)
    createPart({variables: {input: {name, customer, image, blueprint}}})
  }

  const handleDialogCancel = () => setDialogOpen(false)

  const imageReader = new FileReader()
  imageReader.onload = () => setImage(imageReader.result)

  const blueprintReader = new FileReader()
  blueprintReader.onload = () => setBlueprint(blueprintReader.result)

  const handleChange = event => {
    const { target: { id, value, files } } = event
    if (id === "name") setName(value)
    if (id === "customer") setCustomer(value)
    if (id === "image") {
      if (!files[0].type.includes("image/")) alert ("Error uploading image: Filetype not supported")
      else if (files[0].size > 16777216 ) alert ("Error uploading image: File must be less than 16MB")
      else imageReader.readAsDataURL(files[0])
    }
    if (id === "blueprint") {
      if (!files[0].type.includes("image/") && !files[0].type.includes("application/pdf"))
        alert ("Error uploading blueprint: Filetype not supported")
      else if (files[0].size > 16777216 ) alert ("Error uploading image: File must be less than 16MB")
      else {
        blueprintReader.readAsDataURL(files[0]) 
        setBlueprintName(files[0].name)
      }
    }
  }

  const validName = () => name.length > 0
    ? {valid: true}
    : {error: "Please enter a valid name (Unique name with 1 or more characters)"}

  const validCustomer = () => customer.length > 0 
    ? {valid: true}
    : {error: "Please enter a valid customer" }

  const validInput = validName().valid && validCustomer().valid

  const focusNextInput = () => {
    if (!validName().valid) inputRefs.name.focus()
    else if (!validCustomer().valid) inputRefs.customer.focus()
  }

  const handleKeyDown = event => { if (event.key === "Enter")
    validInput ? handleSubmit() : focusNextInput()
  }

  return <SmallWindowView {...props} pageName="Create Part">
    <div style={{ margin: "16px", textAlign: "center", display:"flex", flexDirection:"column", alignItems:"stretch" }}>

      <Typography
        variant="h5"
        style={{ textAlign: "center", margin: "0 0 4px 0" }}
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
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        style={{ backgroundColor: "white" }}
      />

      <Dropdown
        id="customer"
        data={ Customers.data ? Customers.data.customers : []}
        displayField="name"
        clearOnClick
        onSelect={ selection => {
          setCustomer(selection ? selection.name : "")
          if (selection) focusNextInput()
        }}
        onKeyDown={ handleKeyDown }
        inputRef={ref => setInputRefs(Object.assign(inputRefs, {customer: ref}))}
      />

      <div style={{
        display: image ? "none" : "flex",
        margin:"8px auto 11px auto",
        width: "calc(100% - 4px)",
        borderStyle:"inset",
        borderWidth:"2px",
        borderRadius:"4px",
        borderColor:"#0009",
        alignItems:"center",
        justifyContent:"center"
      }}>
        <Typography variant="h5"> {`No image uploaded`} </Typography>
      </div>
      
      <div><img src={image || ""} alt="part" style={{display:image?"flex":"none",maxHeight:"468px", maxWidth:"468px", margin:"8px auto 11px auto"}} /></div>

      <input
        ref={ref => setInputRefs(Object.assign(inputRefs, {image: ref}))}
        accept="image/*"
        id="image"
        type="file"
        style={{display:"none"}}
        onChange={handleChange}
      />
      <label htmlFor="image">
        <Button variant="contained" component="span" color={image?"default":"primary"}>
          {image?"Upload A Different Image...":"Upload Image..."}
        </Button>
      </label>

      <div style={{
        display: "flex",
        margin:"12px auto 12px auto",
        width: "calc(100% - 4px)",
        borderStyle:"inset",
        borderWidth:"2px",
        borderRadius:"4px",
        borderColor:"#0009",
        alignItems:"center",
        justifyContent:"center"
      }}>
        <Typography
          variant="h5"
          style={{  margin: "auto" }}
        > {blueprintName || `No blueprint uploaded`} </Typography>
      </div>


      <input
        ref={ref => setInputRefs(Object.assign(inputRefs, {blueprint: ref}))}
        accept="application/pdf, image/*"
        id="blueprint"
        type="file"
        style={{display:"none"}}
        onChange={handleChange}
      />
      <label htmlFor="blueprint">
        <Button variant="contained" component="span" color={blueprint?"default":"primary"}>
        {blueprint?"Upload A Different Blueprint...":"Upload Blueprint..."}
        </Button>
      </label>


      <Button
        id="create"
        color="primary"
        variant="contained"
        disabled={ !validInput }
        fullWidth
        style={{ margin: "16px 0 12px 0" }}
        onClick={ handleSubmit }
      > Create </Button>

      <Button id="cancel" variant="contained" fullWidth onClick={() => props.changePage("/parts")}
        style={{ margin: "0px 0" }}
      > Cancel </Button>

      <SignatureDialog open={dialogOpen} submit={handleDialogSubmit} cancel={handleDialogCancel} />
    </div>
  </SmallWindowView>
}