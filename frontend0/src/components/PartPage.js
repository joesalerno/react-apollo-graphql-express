import React, { useState } from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"
import getDateFromTime from "../modules/getDateFromTime"
import SmallWindowView from "./SmallWindowView"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import AddStepToPartDialog from "./AddStepToPartDialog"

const GET_PART = gql` query GetPart($id: String!) {
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
      id
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
}`

const ADD_STEP_TO_PART = gql` mutation AddStepToPart( $input: AddStepToPartInput! ) {
  addStepToPart(input: $input) {
    id
  }
}`

export default props => {
  const Part = useQuery(GET_PART, { variables: { id: props.match.params.id } })
  const [addStepToPart] = useMutation(ADD_STEP_TO_PART, {
    onCompleted: () => {Part.refetch()},
    onError: error => { error.message === "Response not successful: Received status code 400"
      ? alert(`Error adding step to part: Not authorized`)
      : alert(`Error adding step to part: ${error}`)
    }
  })
  const [addStepDialogOpen, setAddStepDialogOpen] = useState(false)

  const handleClickAddStep = () => setAddStepDialogOpen(true)

  const handleAddStepDialogSubmit = (stepType, prevSteps, username, password) => {
    setAddStepDialogOpen(false)
    const prevStepIds = prevSteps.map(prevStep => prevStep.id)
    addStepToPart({variables: {input: {stepType, partId: props.match.params.id, prevStepIds}}})
  }

  const handleAddStepDialogCancel = () => setAddStepDialogOpen(false)

 const handleKeyDown = e => {
   const { target: { id, value }, key } = e
   //
 }

  return <SmallWindowView
    {...props}
    width="500px"
    pageName={Part.loading ? "Loading" : Part.data.part.name}
  >
    {Part.loading ?  "Loading..." : <div style={{ margin: "16px" }}>
      <Typography variant="h6" style={{ textAlign: "center", margin: "-10px auto 0 auto" }}>
        {`${Part.data.part.customer.name} ${Part.data.part.name}`}
      </Typography>

      <div
        style={{
          margin: "0 auto 8px auto",
          width: "auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#DADADA"
        }}
      >
        <img
          name={`${Part.data.part.name}-image`}
          src={Part.data.part.image || ""}
          style={{ width: "100%", margin: "0 auto", display:!Part.data.part.image? "none":"inline" }}
        />

        <div style={{
          height: "180px",
          width: `calc(100% - 4px)`,
          display: Part.data.part.image ? "none" : "flex",
          borderStyle: "inset",
          borderWidth: "2px",
          borderRadius: "4px",
          borderColor: "#0009",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Typography variant="h5"> No part image </Typography>
        </div>

        <Button 
          variant="contained"
          size="small" color="default"
          fullWidth 
          href={Part.data.part.blueprint || ""}
          download={Part.data.part.blueprint ? `${Part.data.part.name}_blueprint.${Part.data.part.blueprint.split(`;`)[0].split(`/`)[1]}` : `blueprint`}
        >
          Upload New Blueprint
        </Button>

        <Button 
          variant="contained"
          size="small" color="primary"
          fullWidth 
          href={Part.data.part.blueprint || ""}
          download={Part.data.part.blueprint ? `${Part.data.part.name}_blueprint.${Part.data.part.blueprint.split(`;`)[0].split(`/`)[1]}` : `blueprint`}
        >
          Open Blueprint
        </Button>
      </div>

      <Divider variant="middle" />

      <div>
        <Typography variant="body1" style={{ opacity: "0.7" }}>
          {`Created ${getDateFromTime(Part.data.part.timeCreated)}`}
        </Typography>
      </div>
      <div>
        <Typography variant="body1" style={{ opacity: "0.7" }}>
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
            margin: "4px 0 4px 0",
            padding: "16px"
          }}
        >
          <div style={{display: "flex", alignItems:"center"}}>
            <Typography variant="body1" style={{margin: "0 auto 0 0"}}>{step.stepType.name}</Typography>
            <Button style={{margin:"4px"}} variant="contained" size="small" onClick={() => alert("Implement me!")}>Edit Step</Button>
            <Button style={{margin:"4px"}} variant="contained" size="small" color="secondary" onClick={() => alert("Implement me!")}>Remove Step</Button>
          </div>
          <Typography variant="body1"> {step.prevSteps.length > 0 
              ? step.prevSteps.reduce((acc, prevStep, index) => {
                acc += prevStep.stepType.name
                if ( index < step.prevSteps.length -1 ) acc += ", "
                return acc
              }, "Requires: ") 
              : ""
            }
          </Typography>
        </div>
      ))}

      <Button variant="contained" size="small" color="primary" fullWidth onClick={handleClickAddStep}>
        Add Step
      </Button>

      <AddStepToPartDialog Part={Part} open={addStepDialogOpen} submit={handleAddStepDialogSubmit} cancel={handleAddStepDialogCancel} />

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
        Create New Job
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
        Post Comment on Part
      </Button>
    </div>}
  </SmallWindowView>
}
