const { gql } = require("apollo-server")
module.exports = gql`
  "A registered user"
  type User {
    id: String!
    username: String!
    employeeId: String!
    email: String!
    password: String!
    enabled: Boolean!
    roles: [Role]
    comments: [Comment]
    commentsBy: [Comment]
    stepsCompleted: [JobStep]
    timeCreated: String!
  }

  "A role which allows users to perform certain operations"
  type Role {
    id: String!
    name: String!
    users: [User!]!
    jobSteps: [JobStep]
    partSteps: [PartStep]
    stepTypes: [StepType]
    comments: [Comment]
    timeCreated: String!
  }

  "A customer that has its own part types and can order jobs"
  type Customer {
    id: String!
    name: String!
    enabled: Boolean!
    parts: [Part]
    jobs: [Job]
    comments: [Comment]
    timeCreated: String!
  }

  "A type of part"
  type Part {
    id: String!
    name: String!
    customer: Customer!
    steps: [PartStep]
    enabled: Boolean!
    jobs: [Job]
    comments: [Comment]
    timeCreated: String!
  }

  "A single job ordered by a customer"
  type Job {
    id: String!
    jobNo: String!
    customer: Customer!
    part: Part!
    status: String!
    enabled: Boolean!
    steps: [JobStep]
    currentSteps: [JobStep]
    comments: [Comment]
    timeCreated: String!
  }

  "One of the steps required in the process of a specific job"
  type JobStep {
    id: String!
    job: Job!
    stepType: StepType!
    prevSteps: [JobStep]
    completed: Boolean
    completedBy: User
    completedTime: String
    formData: [String]
    enabled: Boolean!
    comments: [Comment]
    timeCreated: String!
  }

  "One of the steps required in the standard process of making a specific part"
  type PartStep {
    id: String!
    part: Part!
    stepType: StepType!
    prevSteps: [PartStep]
    enabled: Boolean!
    comments: [Comment]
    timeCreated: String!
  }

  "A type of step that can be required in the processes of jobs"
  type StepType {
    id: String!
    name: String!
    description: String!
    instructions: String!
    form: Form
    requiredRoles: [Role]
    enabled: Boolean!
    jobs: [Job]
    jobSteps: [JobStep]
    parts: [Part]
    partSteps: [PartStep]
    comments: [Comment]
    timeCreated: String!
  }

  "One input required in a form and an optional regEx string or validator that checks input"
  type FormData {
    instructions: String!
    regEx: String
    validator: Validator
  }

  "Input object type for form data"
  input FormInput {
    instructions: String!
    regEx: String
    validator: String
  }

  "A set of data inputs required to complete a step"
  type Form {
    id: String!
    name: String!
    description: String!
    data: [FormData!]!
    enabled: Boolean!
    jobSteps: [JobStep]
    partSteps: [PartStep]
    stepTypes: [StepType]
    comments: [Comment]
    timeCreated: String!
  }

  "A validator function that can be used to ensure form input is valid"
  type Validator {
    id: String!
    moduleName: String!
    description: String!
    enabled: Boolean!
    test(data: String!): Boolean
    forms: [Form]
    comments: [Comment]
    timeCreated: String!
  }

  "A comment by a user about a subject"
  type Comment {
    id: String!
    subject: String!
    user: User!
    data: String!
    editTimes: [String]
    enabled: Boolean!
    comments: [Comment]
    timeCreated: String!
  }

  type Query {
    "The currently logged in user. Must be logged in"
    me: User

    "A single registered user. Must provide user id or username"
    user(id: String, username: String): User

    "List of all users"
    users: [User]

    "A single user role. Must provide role id or name"
    role(id: String, name: String): Role

    "List of all user roles"
    roles: [Role]

    "A single customer. Must provide customer id or name"
    customer(id: String, name: String): Customer

    "List of all customers"
    customers: [Customer]

    "A single part type. Must provide part id"
    part(id: String): Part

    "List of all part types"
    parts: [Part]

    "A single job order. Must provide job id or jobNo"
    job(id: String, jobNo: String): Job

    "A list of all job orders."
    jobs: [Job]

    "A single step in the process of a job. Must provide jobStep id"
    jobStep(id: String): JobStep

    "List of every step in the processes of all jobs"
    jobSteps: [JobStep]

    "A single step in the standard process of making a part. Must provide partStep id"
    partStep(id: String): PartStep

    "List of every step in the standard processes of making all parts"
    partSteps: [PartStep]

    "A single job step type. Must provide stepType id or name"
    stepType(id: String, name: String): StepType

    "List of all job step types"
    stepTypes: [StepType]

    "A single input form type. Must provide form id or name"
    form(id: String, name: String): Form

    "List of all input form types"
    forms: [Form]

    "A single input validator type. Must provide validator id or moduleName"
    validator(id: String, moduleName: String): Validator

    "List of all input validator types"
    validators: [Validator]

    "A single comment. Must provide comment id"
    comment(id: String): Comment

    "List of all comments"
    comments: [Comment]
  }

  type Mutation {
    "Create a new registered user. Must provide username, employeeID, email, and password args"
    createUser(username: String! employeeId: String! email: String! password: String!): User

    "Edit a registered user. Must provide a user arg with id or username as well as fields to replace"
    editUser(user: String username: String employeeId: String email: String password: String, enabled: Boolean): User

    "Disable a user. User can no longer log in or perform any actions. Must provide user arg with id or username"
    disableUser(user: String): User

    "Enable a user. User can log in and perform actions normally. Must provide user arg with id or username"
    enableUser(user: String): User

    "Create a new user role"
    createRole(name: String! users: [String!]): Role

    "Edit a user role. Must provide a role arg with id or name as well as fields to replace"
    editRole(role: String! name: String users: [String!]): Role

    "Assign a role to a given user. Must provide user and role args with id or name of user and role"
    addUserToRole(user: String! role: String!): Role

    "Remove a role from a given user. Must provide user and role args with id or name of user and role"
    removeUserFromRole(user: String! role: String!): Role

    "Creat a new customer. Must provide customer name"
    createCustomer(name: String!): Customer

    "Edit a given customer. Must provide customer arg with id or name as well as fields to replace"
    editCustomer(customer: String! name: String enabled: Boolean): Customer

    "Disable a customer. Customer cannot have new jobs or new parts created for it. Must provide customer arg with name or id"
    disableCustomer(customer: String!): Customer

    "Enable a customer. Customer can have new jobs or new parts created for it. Must provide customer arg with name or id"
    enableCustomer(customer: String!): Customer

    "Create a new part type. Must provide part name and customer name or id"
    createPart(name: String! customer: String!): Part

    "Edit a given part type. Must provide part id as well as fields to replace"
    editPart(id: String! name: String customer: String enabled: Boolean): Part

    "Add a step to the standard process for making a part. Must provide stepType and part args with id or name and optional prevStepIds array"
    addStepToPart(stepType: String! part: String! prevStepIds: [String!]): Part

    "Remove a step from the standard process for making a part. Replaces the prevStepIds of any steps referencing the removed step with the prevStepIds of removed. Must provide partStepId or stepType to remove"
    removeStepFromPart(id: String, stepType: String): Part

    "Disable a part step. Part step will not be added to new jobs created for part. Must provide partStepId"
    disablePartStep(id: String!): PartStep

    "Enable a part step. Part step will be added to new jobs created for part. Must provide partStepId"
    enablePartStep(id: String!): PartStep

    "Disable a part. Part cannot be ordered in new jobs. Must provide part id"
    disablePart(id: String!): Part

    "Enable a part. Part can be ordered in new jobs. Must provide part id"
    enablePart(id: String!): Part

    "Create a new job order. Must provide job jobNo, customer, and partId"
    createJob(jobNo: String! customer: String! partId: String!): Job

    "Edit a given job order. Must provide job arg with id or jobNo as well as fields to replace"
    editJob(job: String! jobNo: String customer: String partId: String enabled: Boolean): Job

    "Add a step to the process for completing a job. Must provide stepType and job args with id or name/jobNo and optional prevStepIds array"
    addStepToJob(stepType: String! job: String! prevStepIds: [String!]): Job

    "Remove a step from the process for completing a job. Replaces the prevStepIds of any steps referencing the removed step with the prevStepIds of removed. Must provide jobStepId or stepType to remove"
    removeStepFromJob(jobStepId: String, stepType: String): Job

    "Disable a job step. Job step no longer must be completed to complete the job. Must provide jobStepId"
    disableJobStep(id: String!): JobStep

    "Enable a job step. Job step must be completed to finish the job. Must provide jobStepId"
    enableJobStep(id: String!): JobStep

    "Complete a step of the process of a job. Must provide step id and data for the step's form if any"
    completeJobStep(id: String! data: [String!]!): Job

    "Disable a job. Job steps can no longer be completed. Must provide job arg with id or jobNo"
    disableJob(job: String!): Job

    "Enable a job. Job steps can now be completed. Must provide job arg with id or jobNo"
    enableJob(job: String!): Job

    "Create a new job step type. Must provide name, description, instructions. Optional form arg with id or name and requiredRoles arg with array of id or name"
    createStepType(name: String! description: String! instructions: String! form: String requiredRoles: [String]): StepType

    "Edit a specific job step type. Must provide stepType arg with name or id as well as fields to replace"
    editStepType(stepType: String! name: String description: String instructions: String form: String requiredRoles: [String], enabled: Boolean): StepType

    "Add a role to the list of required roles for a specific step type. Must provide role and stepType args with name or id"
    addRoleToStepType(role: String! stepType: String!): StepType

    "Remove a role from the list of required roles for a specific step type. Must provide role and stepType args with name or id"
    removeRoleFromStepType(role: String! stepType: String!): StepType

    "Disable a StepType. StepType can no longer be added to the processes of jobs and is no longer required in order to complete jobs with steps having the type. Must provide stepType arg with name or id"
    disableStepType(stepType: String!): StepType

    "Enable a StepType. StepType can be added to the processes of jobs and is required in order to complete jobs with the step having the type. Must provide stepType arg with name or id"
    enableStepType(stepType: String!): StepType

    "Create a new data input form. Must provide name, description, and data with FormInput type"
    createForm(name: String! description: String! data: [FormInput]!): Form

    "Edit a specific data input form. Must provide form arg with name or id as well as fields to replace"
    editForm(form: String! name: String description: String data: [FormInput] enabled: Boolean): Form

    "Disable a specific data input form. Form will no longer be required to complete job steps and can't be added to job step types. Must provide form arg with name or id"
    disableForm(form: String!): Form

    "Enable a specific data input form. Form can be required to complete job steps and can be added to job step types. Must provide form arg with name or id"
    enableForm(form: String!): Form

    "Create a new data input validator. Must provide moduleName and description. Module will attempt to load from /validators/moduleName"
    createValidator(moduleName: String! description: String!): Validator

    "Edit a specific validator. Must provide validator arg with moduleName or id as well as fields to replace"
    editValidator(validator: String! moduleName: String description: String enabled: Boolean): Validator

    "Disable a specific validator. Validator can't be added to forms and will no longer validate form input. In its place /validators/default.js will be used. Must provide validator arg with moduleName or id"
    disableValidator(validator: String!): Validator

    "Enable a specific validator. Validator can be added to forms and be used to validate form input. Must provide validator arg with moduleName or id"
    enableValidator(validator: String!): Validator

    "Create a new comment about a subject. Must provide subjectId and data"
    createComment(subjectId: String! data: String!): Comment

    "Edit a specific comment. Must provide comment id and data to replace comment with"
    editComment(id: String! data: String! enabled: Boolean): Comment

    "Disables a specific comment. Comment can no longer be replied to and will show -deleted- instead of its data. Must provide comment id"
    disableComment(id: String!): Comment

    "Enables a specific comment. Comment can be replied to and its data can be read. Must provide comment id"
    enableComment(id: String!): Comment
  }
`