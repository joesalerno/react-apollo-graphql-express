const GET_PART = gql` query GetPart($id: String!) {
  part(id:$id) {
    id
    name
    customer {
      name
      enabled
    }
    steps {
      stepType {
        name
        enabled
      }
      prevSteps {
        stepType {
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

export default props => {
  const Part = useQuery(GET_PART, {variables: {id: props.match.params.id}})
  return <SmallWindowView {...props} width="375px" pageName={`Job ${props.match.params.jobNo}`}>
    { Job.loading ? "Loading..." : (<div style={{margin: "16px"}}>

    </div>}
  </SmallWindowView>
}
