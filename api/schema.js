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
    image: String
    blueprint: String
    steps: [PartStep]
    enabled: Boolean!
    jobs: [Job]
    comments: [Comment]
    timeCreated: String!
  }

  type Location {
    name: String!
    jobs: [Job]
    stepTypes: [StepType]
    timeCreated: String!
  }

  "A single job ordered by a customer"
  type Job {
    id: String!
    jobNo: String!
    customer: Customer!
    part: Part!
    status: String!
    location: Location!
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
    locations: [Location]
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

  type ValidatorModule {
    filename: String!
    validator: Validator
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
    user(id: String username: String): User

    "List of all users"
    users: [User]

    "A single user role. Must provide role id or name"
    role(id: String name: String): Role

    "List of all user roles"
    roles: [Role]

    "A single customer. Must provide customer id or name"
    customer(id: String name: String): Customer

    "List of all customers"
    customers: [Customer]

    "A single part type. Must provide part id"
    part(id: String): Part

    "List of all part types"
    parts: [Part]

    "A single job order. Must provide job id or jobNo"
    job(id: String jobNo: String): Job

    "A list of all job orders."
    jobs: [Job]

    "A single work location. Must id or name"
    location(id: String name: String): Location

    "A list of all work locations."
    locations: [Location]

    "A single step in the process of a job. Must provide jobStep id"
    jobStep(id: String): JobStep

    "List of every step in the processes of all jobs"
    jobSteps: [JobStep]

    "A single step in the standard process of making a part. Must provide partStep id"
    partStep(id: String): PartStep

    "List of every step in the standard processes of making all parts"
    partSteps: [PartStep]

    "A single job step type. Must provide stepType id or name"
    stepType(id: String name: String): StepType

    "List of all job step types"
    stepTypes: [StepType]

    "A single input form type. Must provide form id or name"
    form(id: String name: String): Form

    "List of all input form types"
    forms: [Form]

    "A single input validator type. Must provide validator id or moduleName"
    validator(id: String moduleName: String): Validator

    "List of all input validator types"
    validators: [Validator]

    "List of all files in validators directory"
    validatorModules: [ValidatorModule]

    "A single comment. Must provide comment id"
    comment(id: String): Comment

    "List of all comments"
    comments: [Comment]
  }

  "Input object type for createUser() mutation"
  input CreateUserInput { username: String! employeeId: String! email: String! password: String!, roles: [String!] }

  "Input object type for editUser() mutation"
  input EditUserInput { username: String employeeId: String email: String password: String enabled: Boolean }

  "Input object type for disableUser() mutation"
  input DisableUserInput { user: String }

  "Input object type for enableUser() mutation"
  input EnableUserInput { user: String }

  "Input object type for createRole() mutation"
  input CreateRoleInput { name: String! users: [String!] }

  "Input object type for editRole() mutation"
  input EditRoleInput { role: String! name: String users: [String!] }

  "Input object type for addUserToRole() mutation"
  input AddUserToRoleInput { user: String! role: String! }

  "Input object type for removeUserFromRole() mutation"
  input RemoveUserFromRoleInput { user: String! role: String! }

  "Input object type for createCustomer() mutation"
  input CreateCustomerInput { name: String! }

  "Input object type for editCustomer() mutation"
  input EditCustomerInput { customer: String! name: String enabled: Boolean }

  "Input object type for disableCustomer() mutation"
  input DisableCustomerInput { customer: String! }

  "Input object type for enableCustomer() mutation"
  input EnableCustomerInput { customer: String! }

  "Input object type for createPart() mutation"
  input CreatePartInput { name: String! customer: String! image: String blueprint: String }

  "Input object type for editPart() mutation"
  input EditPartInput { id: String! name: String customer: String image: String blueprint: String enabled: Boolean }

  "Input object type foraddStepToPart() mutation"
  input AddStepToPartInput { stepType: String! partId: String! prevStepIds: [String!] }

  "Input object type for removeStepFromPart() mutation"
  input RemoveStepFromPartInput { id: String stepType: String }

  "Input object type for disablePartStep() mutation"
  input DisablePartStepInput { id: String! }

  "Input object type for enablePartStep() mutation"
  input EnablePartStepInput { id: String! }

  "Input object type for disablePart() mutation"
  input DisablePartInput { id: String! }  

  "Input object type for enablePart() mutation"
  input EnablePartInput { id: String! }

  "Input object type for createLocation() mutation"
  input CreateLocationInput { name: String! stepTypes: [String] }

  "Input object type for editLocation() mutation"
  input EditLocationInput { location: String! name: String stepTypes: [String] enabled: Boolean }

  "Input object type for disableLocation() mutation"
  input DisableLocationInput { location: String! }

  "Input object type for enableLocation() mutation"
  input EnableLocationInput { location: String! }

  "Input object type for createJob() mutation"
  input CreateJobInput { jobNo: String! customer: String! partId: String! }

   "Input object type for editJob() mutation"
  input EditJobInput { job: String! jobNo: String customer: String partId: String enabled: Boolean location: String }

  "Input object type for moveJob() mutation"
  input MoveJobInput { job: String! location: String!}

   "Input object type for addStepToJob() mutation"
  input AddStepToJobInput { stepType: String! job: String! prevStepIds: [String!] }

   "Input object type for removeStepFromJob() mutation"
  input RemoveStepFromJobInput { jobStepId: String stepType: String }

   "Input object type for disableJobStep() mutation"
  input DisableJobStepInput { id: String! }

   "Input object type for enableJobStep() mutation"
  input EnableJobStepInput { id: String! }

   "Input object type for completeJobStep() mutation"
  input CompleteJobStepInput { id: String! data: [String!]! }

   "Input object type for disableJob() mutation"
  input DisableJobInput { job: String! }

   "Input object type for enableJob() mutation"
  input EnableJobInput { job: String! }

   "Input object type for createStepType() mutation"
  input CreateStepTypeInput { name: String! description: String! instructions: String! form: String requiredRoles: [String] }

   "Input object type for editStepType() mutation"
  input EditStepTypeInput { stepType: String! name: String description: String instructions: String form: String requiredRoles: [String] enabled: Boolean }

   "Input object type for addRoleToStepType() mutation"
  input AddRoleToStepTypeInput { role: String! stepType: String! }

   "Input object type for removeRoleFromStepType() mutation"
  input RemoveRoleFromStepTypeInput { role: String! stepType: String! }

   "Input object type for disableStepType() mutation"
  input DisableStepTypeInput { stepType: String! }

   "Input object type for enableStepType() mutation"
  input EnableStepTypeInput { stepType: String! }

  "Input object type for Form mutations"
  input FormInputData { instructions: String! regEx: String validator: String }

   "Input object type for createForm() mutation"
  input CreateFormInput { name: String! description: String! data: [FormInputData]! }

   "Input object type for editForm() mutation"
  input EditFormInput { form: String! name: String description: String data: [FormInputData] enabled: Boolean }

   "Input object type for disableForm() mutation"
  input DisableFormInput { form: String! }

   "Input object type for enableForm() mutation"
  input EnableFormInput { form: String! }

   "Input object type for createValidator() mutation"
  input CreateValidatorInput { moduleName: String! description: String! }

   "Input object type for editValidator() mutation"
  input EditValidatorInput { validator: String! moduleName: String description: String enabled: Boolean }

   "Input object type for disableValidator() mutation"
  input DisableValidatorInput { validator: String! }

   "Input object type for enableValidator() mutation"
  input EnableValidatorInput { validator: String! }

   "Input object type for createComment() mutation"
  input CreateCommentInput { subjectId: String! data: String! }

   "Input object type for editComment() mutation"
  input EditCommentInput { id: String! data: String! enabled: Boolean }

   "Input editCommentobject type for disableComment() mutation"
  input DisableCommentInput { id: String! }

   "Input object type for enableComment() mutation"
  input EnableCommentInput { id: String! }

  type Mutation {
    "Create a new registered user."
    createUser(input: CreateUserInput!) : User

    "Edit a registered user."
    editUser(input: EditUserInput!) : User

    "Disable a user. User can no longer log in or perform any actions."
    disableUser(input: DisableUserInput!) : User

    "Enable a user. User can log in and perform actions normally."
    enableUser(input: EnableUserInput!) : User

    "Create a new user role."
    createRole(input: CreateRoleInput!) : Role

    "Edit a user role"
    editRole(input: EditRoleInput!) : Role

    "Assign a role to a given user."
    addUserToRole(input: AddUserToRoleInput!) : Role

    "Remove a role from a given user."
    removeUserFromRole(input: RemoveUserFromRoleInput!) : Role

    "Creat a new customer."
    createCustomer(input: CreateCustomerInput!) : Customer

    "Edit a given customer."
    editCustomer(input: EditCustomerInput!) : Customer

    "Disable a customer. Customer cannot have new jobs or new parts created for it."
    disableCustomer(input: DisableCustomerInput!) : Customer

    "Enable a customer. Customer can have new jobs or new parts created for it."
    enableCustomer(input: EnableCustomerInput!) : Customer

    "Create a new part type."
    createPart(input: CreatePartInput!) : Part

    "Edit a given part type."
    editPart(input: EditPartInput!) : Part

    "Add a step to the standard process for making a part."
    addStepToPart(input: AddStepToPartInput!) : Part

    "Remove a step from the standard process for making a part. Replaces the prevStepIds of any steps referencing the removed step with the prevStepIds of removed."
    removeStepFromPart(input: RemoveStepFromPartInput!) : Part

    "Disable a part step. Part step will not be added to new jobs created for part."
    disablePartStep(input: DisablePartStepInput!) : PartStep

    "Enable a part step. Part step will be added to new jobs created for part."
    enablePartStep(input: EnablePartStepInput!) : PartStep

    "Disable a part. Part cannot be ordered in new jobs."
    disablePart(input: DisablePartInput!) : Part

    "Enable a part. Part can be ordered in new jobs."
    enablePart(input: EnablePartInput!) : Part

    "Create a new work location."
    createLocation(input: CreateLocationInput!) : Location

    "Edit a given work location."
    editLocation(input: EditLocationInput!) : Location

    "Disable a work location. Jobs can no longer be moved to the location."
    disableLocation(input: EnableLocationInput!) : Location

    "Enable a work location. Jobs can be moved to the location."
    enableLocation(input: DisableLocationInput!) : Location

    "Create a new job order."
    createJob(input: CreateJobInput!) : Job

    "Edit a given job order."
    editJob(input: EditJobInput!) : Job

    "Move a job to a work location"
    moveJob(input: MoveJobInput!) : Job

    "Add a step to the process for completing a job."
    addStepToJob(input: AddStepToJobInput!) : Job

    "Remove a step from the process for completing a job. Replaces the prevStepIds of any steps referencing the removed step with the prevStepIds of removed."
    removeStepFromJob(input: RemoveStepFromJobInput!) : Job

    "Disable a job step. Job step no longer must be completed to complete the job."
    disableJobStep(input: DisableJobStepInput!) : JobStep

    "Enable a job step. Job step must be completed to finish the job."
    enableJobStep(input: EnableJobStepInput!) : JobStep

    "Complete a step of the process of a job."
    completeJobStep(input: CompleteJobStepInput!) : Job

    "Disable a job. Job steps can no longer be completed."
    disableJob(input: DisableJobInput!) : Job

    "Enable a job. Job steps can now be completed."
    enableJob(input: EnableJobInput!) : Job

    "Create a new job step type."
    createStepType(input: CreateStepTypeInput!) : StepType

    "Edit a specific job step type."
    editStepType(input: EditStepTypeInput!) : StepType

    "Add a role to the list of required roles for a specific step type."
    addRoleToStepType(input: AddRoleToStepTypeInput!) : StepType

    "Remove a role from the list of required roles for a specific step type."
    removeRoleFromStepType(input: RemoveRoleFromStepTypeInput!) : StepType

    "Disable a StepType. StepType can no longer be added to the processes of jobs and is no longer required in order to complete jobs with steps having the type."
    disableStepType(input: DisableStepTypeInput!) : StepType

    "Enable a StepType. StepType can be added to the processes of jobs and is required in order to complete jobs with the step having the type."
    enableStepType(input: EnableStepTypeInput!) : StepType

    "Create a new data input form."
    createForm(input: CreateFormInput!) : Form

    "Edit a specific data input form."
    editForm(input: EditFormInput!) : Form

    "Disable a specific data input form. Form will no longer be required to complete job steps and can't be added to job step types."
    disableForm(input: DisableFormInput!) : Form

    "Enable a specific data input form. Form can be required to complete job steps and can be added to job step types."
    enableForm(input: EnableFormInput!) : Form

    "Create a new data input validator. Module will attempt to load from /validators/{moduleName}."
    createValidator(input: CreateValidatorInput!) : Validator

    "Edit a specific validator. Must provide validator arg with moduleName or id as well as fields to replace."
    editValidator(input: EditValidatorInput!) : Validator

    "Disable a specific validator. Validator can't be added to forms and will no longer validate form input. In its place /validators/default.js will be used."
    disableValidator(input: DisableValidatorInput!) : Validator

    "Enable a specific validator. Validator can be added to forms and be used to validate form input."
    enableValidator(input: EnableValidatorInput!) : Validator

    "Create a new comment about a subject."
    createComment(input: CreateCommentInput!) : Comment

    "Edit a specific comment."
    editComment(input: EditCommentInput!) : Comment

    "Disables a specific comment. Comment can no longer be replied to and will show -deleted- instead of its data."
    disableComment(input: DisableCommentInput!) : Comment

    "Enables a specific comment. Comment can be replied to and its data can be read."
    enableComment(input: EnableCommentInput!) : Comment
  }
`