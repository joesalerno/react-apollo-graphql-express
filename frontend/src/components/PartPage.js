import React, { useState } from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import getDateFromTime from "../modules/getDateFromTime"
import SmallWindowView from "./SmallWindowView"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import Dropdown from "./Dropdown"
import MultiDropdown from "./MultiDropdown"
import SignatureDialog from "./SignatureDialog"

const GET_STEPTYPES = gql`{
  stepTypes {
    id
    name
  }
}`

const GET_PART = gql`
  query GetPart($id: String!) {
    part(id: $id) {
      id
      name
      image
      blueprint
      customer {
        name
        enabled
      }
      steps {
        stepType {
          id
          name
          enabled
        }
        prevSteps {
          stepType {
            id
            name
            enabled
          }
          enabled
        }
        enabled
      }
      jobs {
        jobNo
        status
        currentSteps {
          stepType {
            name
            enabled
          }
          enabled
        }
        enabled
      }
      comments {
        user {
          username
        }
        data
        timeCreated
        editTimes
      }
      timeCreated
      enabled
    }
  }
`

export default props => {
  const Part = useQuery(GET_PART, { variables: { id: props.match.params.id } })
  const StepTypes = useQuery(GET_STEPTYPES)
  const [stepType, setStepType] = useState(0)
  const [prevSteps, setPrevSteps] = useState([])
  const [inputRefs, setInputRefs] = useState({})


  const validStepType = () => stepType.length > 0 &&
  (StepTypes.loading || StepTypes.data.stepTypes.some(some => stepType.id === some.id))
   ? { valid: true }
   : { error: "Please enter a valid step type (Must exist)" }
 
 const validPrevSteps = () => prevSteps.length === 0 ||
  (Part.loading || prevSteps.every(prevStep => (Part.data.part.steps.some(step => step.id === prevStep.id))))
   ? { valid: true }
   : { error: "Please enter valid previous steps (None or all must exist)" }
 
 const validAddStepInput = () => validStepType().valid && validPrevSteps().valid
 
 const handleKeyDown = e => {
   const { target: { id, value }, key } = e
 
   console.log(id, value, key)
 }

  return <SmallWindowView
    {...props}
    width="375px"
    pageName={Part.loading ? "Loading" : Part.data.part.name}
  >
    {Part.loading ?  "Loading..." : <div style={{ margin: "16px" }}>
      {console.log(Part.data.part)}
      <Typography variant="h6" style={{ textAlign: "center", margin: "-10px auto 0 auto" }}>
        {`${Part.data.part.customer.name} ${Part.data.part.name}`}
      </Typography>

      <div style={{
        height: "180px",
        width: "auto",
        margin: "8px auto 0 auto",
        display: Part.data.part.image ? "none" : "flex",
        borderStyle: "inset",
        borderWidth: "2px",
        borderRadius: "4px",
        borderColor: "#0009",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Typography variant="h5" style={{ margin: "auto" }}>
          No part image
        </Typography>
      </div>

      <Button
        variant="contained"
        size="small"
        color="primary"
        fullWidth
        style={{ display: Part.data.part.image ? "none" : "block" }}
        href={Part.data.part.blueprint || ""}
        download={Part.data.part.blueprint ? `${Part.data.part.name}_blueprint.${Part.data.part.blueprint.split(`;`)[0].split(`/`)[1]}` : `blueprint`}
        
      >
        Download Blueprint
      </Button>

      <div
        style={{
          margin: "0 auto 8px auto",
          width: "343px",
          display: !Part.data.part.image ? "none" : "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#DADADA"
        }}
      >
        <img
          name={`${Part.data.part.name}-image`}
          src={Part.data.part.image || ""}
          style={{ maxHeight: "180px", width: "343px", margin: "0 auto" }}
        />
        <Button 
          variant="contained"
          size="small" color="primary"
          fullWidth 
          href={Part.data.part.blueprint || ""}
          download={Part.data.part.blueprint ? `${Part.data.part.name}_blueprint.${Part.data.part.blueprint.split(`;`)[0].split(`/`)[1]}` : `blueprint`}
        >
          Download Blueprint
        </Button>
      </div>

      <Divider variant="middle" />

      <div>
        <Typography variant="b1" style={{ opacity: "0.7" }}>
          {`Created ${getDateFromTime(Part.data.part.timeCreated)}`}
        </Typography>
      </div>
      <div>
        <Typography variant="b1" style={{ opacity: "0.7" }}>
          {`ID ${Part.data.part.id} `}
        </Typography>
      </div>

      <Divider variant="middle" />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{`Steps: ${Part.data.part.steps.length}`}</Typography>
        <Typography variant="h6">{`Value: $${Part.data.part.steps.length}`}</Typography>
      </div>
      {Part.data.part.steps.map((step, index) => (
        <div
          key={`step${index}`}
          style={{
            borderStyle: "outset",
            borderWidth: "2px",
            borderRadius: "4px",
            borderColor: "#0009",
            margin: "8px 0 0 0",
            padding: "16px"
          }}
        >
          {step.stepType.name}
        </div>
      ))}

      <div style={{
        borderStyle:"outset",
        borderWidth:"2px",
        borderRadius:"4px",
        borderColor:"#0009",
        margin: "auto",
        padding:"16px"
      }}>
        <Typography variant="h6" style={{textAlign:"center"}}>{`Add Step To Part Process`}</Typography>
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
          data={Part.data ? Part.data.part.steps : []}
          idField="stepType.name"
          displayField="stepType.name"
          selectedItem = {prevSteps}
          setSelectedItem = {setPrevSteps}
          onKeyDown={handleKeyDown}
          inputRefs={ref => setInputRefs(Object.assign(inputRefs, {prevSteps: ref}))}
        />
        <Button fullWidth variant="contained" size="small" color="primary" disabled={validAddStepInput}>
          Add Step
        </Button>
      </div>


      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{`Jobs: ${Part.data.part.jobs.length}`}</Typography>
        <Typography variant="h6">{`Value: $${Part.data.part.jobs.length}`}</Typography>
      </div>
      {Part.data.part.jobs.map((job, index) => (
        <div
          key={`job${index}`}
          style={{
            borderStyle: "outset",
            borderWidth: "2px",
            borderRadius: "4px",
            borderColor: "#0009",
            margin: "8px 0 0 0",
            padding: "16px"
          }}
        >
          {job.jobNo}
        </div>
      ))}

      <Button fullWidth variant="contained" size="small" color="primary">
        New Job With Part
      </Button>

      <Typography variant="h6">{`Comments: ${Part.data.part.comments.length}`}</Typography>

      {Part.data.part.comments.map((comment, index) => (
        <div
          key={`comment${index}`}
          style={{
            borderStyle: "outset",
            borderWidth: "2px",
            borderRadius: "4px",
            borderColor: "#0009",
            margin: "8px 0 0 0",
            padding: "16px"
          }}
        >
          {comment.data}
        </div>
      ))}

      <Button fullWidth variant="contained" size="small" color="primary">
        New Comment On Part
      </Button>
    </div>}
  </SmallWindowView>
}
