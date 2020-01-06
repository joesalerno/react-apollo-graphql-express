const { gql } = require("apollo-server")
module.exports = gql`
  ""
  type Layer {
    name: String!
    path: String!
    layers: [Layer!]!
  }
  ""
  type Step {
    name: String!
    path: String!
    layers: [Layer!]!
  }
  "A single Genesis job representing a type of part"
  type Job {
    name: String!
    path: String!
    steps: [Step!]!
    layers: [Layer!]!
  }

  type Query {
    "A single job order. Must provide job id or jobNo"
    job(id: String jobNo: String): Job

    "A list of all job orders."
    jobs: [Job]
  }

  "Input object type for enableComment() mutation"
  input EnableCommentInput { id: String! }

  type Mutation {
    "Enables a specific comment. Comment can be replied to and its data can be read."
    enableComment(input: EnableCommentInput!) : Comment
  }
`