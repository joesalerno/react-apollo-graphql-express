import React, { useState } from "react"
import SmallWindowView from "./SmallWindowView"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import Divider from "@material-ui/core/Divider"
import FormControlLabel from "@material-ui/core/FormControlLabel"

const GET_JOB = gql` query GetJob($jobNo: String!) {
  job(jobNo:$jobNo){
    jobNo
    customer {
      name
    }
    part {
      name
      customer {
        name
      }
    }
    status
    currentSteps {
      stepType {
        name
        description
        instructions
      }
    }
    comments {
      subject
      data
    }
  }
}`

export default props => {
  const Job = useQuery(GET_JOB, {variables: {jobNo: props.match.params.jobNo}})
  const [showCurrentOnly, setShowCurrentOnly] = useState(true)

  return <SmallWindowView {...props} width="375px" pageName={`Job ${props.match.params.jobNo}`}>
    { Job.loading ? "Loading..." : (<div style={{margin: "16px"}}>
      {console.log(Job.data)}
      <Typography variant="h6">{`Job ${Job.data.job.jobNo} `}</Typography>
      <Divider variant="middle" />
      <Typography variant="h6">{`Customer ${Job.data.job.customer.name} `}</Typography>
      <Typography variant="h6">{`Part ${Job.data.job.part.customer.name} ${Job.data.job.part.name} `}</Typography>
      <Typography variant="h6">{`Status ${Job.data.job.status} `}</Typography>
      <Typography variant="h6">{`Process:`}</Typography>
      <FormControlLabel 
        control={
          <Checkbox color="primary" checked={showCurrentOnly} onChange={() => setShowCurrentOnly(!showCurrentOnly)}></Checkbox>
        } 
        label="Show current steps only"
      />
      {Job.data.job.currentSteps.map(step => <div style={{display:"flex", flexDirection:"column"}}>
        {step.stepType.name}: 
        {step.stepType.description}
        <Button fullWidth variant="contained" color="primary">Complete Step</Button>
      </div>)}
    </div>)
    }
  </SmallWindowView>
}
