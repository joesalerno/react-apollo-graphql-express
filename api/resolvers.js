const {
  User,
  Role,
  Customer,
  Part,
  Location,
  Job,
  StepType,
  JobStep,
  PartStep,
  Form,
  Validator,
  Comment
} = require("./models")
const { userHasRoles, isValidRegEx } = require("./modules")
const fs = require("fs")

module.exports = {
  User: {
    roles: user => Role.find({ userIds: user.id }),
    comments: user => Comment.find({ subjectId: user.id }),
    commentsBy: user => Comment.find({ userId: user.id }),
    stepsCompleted: user => JobStep.find({ completedById: user.id })
  },

  Role: {
    users: role => User.find({ _id: { $in: role.userIds } }),
    jobSteps: async role => {
      const stepTypes = await StepType.find({ requiredRoleIds: role.id })
      const jobSteps = []
      for (var stepType of stepTypes)
        for (var jobStep of await JobStep.find({ stepTypeId: stepType.id }))
          if (jobStep) steps.push(jobStep)
      return jobSteps
    },
    partSteps: async role => {
      const stepTypes = await StepType.find({ requiredRoleIds: role.id })
      const partSteps = []
      for (var stepType of stepTypes)
        for (var partStep of await PartStep.find({ stepTypeId: stepType.id }))
          if (partStep) steps.push(partStep)
      return partSteps
    },
    stepTypes: role => StepType.find({ requiredRoleIds: role.id }),
    comments: role => Comment.find({ subjectId: role.id })
  },

  Customer: {
    parts: customer => Part.find({ customerId: customer.id }),
    jobs: customer => Job.find({ customerId: customer.id }),
    comments: customer => Comment.find({ subjectId: customer.id })
  },

  Part: {
    customer: part => Customer.findById(part.customerId),
    jobs: part => Job.find({ partId: part.id }),
    steps: part => PartStep.find({ partId: part.id }),
    comments: part => Comment.find({ subjectId: part.id })
  },

  Location: {
    jobs: location => Job.find({locationId: location.id}),
    stepTypes: location => StepType.find({locationId: location.id})
  },

  Job: {
    customer: job => Customer.findById(job.customerId),
    part: job => Part.findById(job.partId),
    steps: job => JobStep.find({ jobId: job.id }),
    location: job => Location.findById(job.locationId),
    currentSteps: async job => {
      var jobSteps = await JobStep.find({ jobId: job.id })
      for (var jobStep of jobSteps) {
        if (jobStep.completed) jobSteps = jobSteps.filter(step => step.id != jobStep.id)
        if (!await jobStep.prevStepsCompleted()) jobSteps = jobSteps.filter(step => step.id != jobStep.id)
      }
      return jobSteps
    },
    comments: job => Comment.find({ subjectId: job.id })
  },

  StepType: {
    requiredRoles: stepType => Role.find({ _id: { $in: stepType.requiredRoleIds } }),
    form: stepType => Form.findById(stepType.formId),
    jobSteps: stepType => JobStep.find({ stepTypeId: stepType.id }),
    partSteps: stepType => PartStep.find({ stepTypeId: stepType.id }),
    comments: stepType => Comment.find({ subjectId: stepType.id }),
    locations: stepType => Location.find({ _id: { $in: stepType.locationIds } }),
    jobs: async stepType => {
      const jobs = []
      for (var jobStep of await JobStep.find({ stepTypeId: stepType.id })) {
        const job = await Job.findById(jobStep.jobId)
        if (job) jobs.push(job)
      }
      return jobs
    },
    parts: async stepType => {
      const parts = []
      for (var partStep of await PartStep.find({ stepTypeId: stepType.id })) {
        const part = await Part.findById(partStep.partId)
        if (part) parts.push(part)
      }
      return parts
    }
  },

  JobStep: {
    job: jobStep => Job.findById(jobStep.jobId),
    stepType: jobStep => StepType.findById(jobStep.stepTypeId),
    prevSteps: jobStep => JobStep.find({ prevStepIds: jobStep.id }),
    completedBy: jobStep => User.findById(jobStep.completedById),
    comments: jobStep => Comment.find({ subjectId: jobStep.id })
  },

  PartStep: {
    part: partStep => Part.findById(partStep.partId),
    stepType: partStep => StepType.findById(partStep.stepTypeId),
    prevSteps: partStep => PartStep.find({ prevStepIds: partStep.id }),
    comments: partStep => Comment.find({ subjectId: partStep.id })
  },

  FormData: {
    validator: formData => Validator.findById(formData.validatorId)
  },

  Form: {
    stepTypes: form => StepType.find({ formId: form.id }),
    comments: form => Comment.find({ subjectId: form.id })
  },

  Validator: {
    test: (validator, { data }) => validator.execute(data),
    forms: validator => Form.find({ "data.validatorId": validator.id }),
    comments: validator => Comment.find({ subjectId: validator.id })
  },

  ValidatorModule: {
    validator: validatorModule => Validator.findOne({moduleName: validatorModule.fileName})
  },

  Comment: {
    data: comment => {
      if (!comment.enabled) return "-deleted-"
      if (comment.edits.length > 0) return comment.edits[comment.edits.length - 1]
      return comment.data
    },
    comments: comment => Comment.find({ subjectId: comment.id }),
    user: comment => User.findById(comment.userId)
  },

  Query: {
    me: (root, args, { self }) => self,

    user: (root, { id, username }) => {
      if (!id && !username) throw Error("Must provide id or username")
      return User.findByIdOrName(id ? id : username)
    },
    users: () => User.find({}),

    role: (root, { id, name }) => {
      if (!id && !name) throw Error("Must provide id or name")
      return Role.findByIdOrName(id ? id : name)
    },

    roles: () => Role.find({}),

    customer: (root, { id, name }) => {
      if (!id && !name) throw Error("Must provide id or name")
      return Customer.findByIdOrName(id ? id : name)
    },

    customers: () => Customer.find({}),

    part: (root, { id }) => Part.findById(id),

    parts: () => Part.find({}),

    location: (root, {id, name}) => {
      if (!id && !name) throw Error("Must provide an id or name")
      return Location.findByIdOrName(id ? id : name)
    },

    locations: () => Location.find({}),

    job: (root, { id, jobNo }) => {
      if (!id && !jobNo) throw Error("Must provide an id or jobNo")
      return Job.findByIdOrNo(id ? id : jobNo)
    },

    jobs: () => Job.find({}),

    stepType: (root, { id, name }) => {
      if (!id && !name) throw Error("Must provide id or name")
      return StepType.findByIdOrName(id ? id : name)
    },

    stepTypes: () => StepType.find({}),

    jobStep: (root, { id }) => JobStep.findById(id),

    jobSteps: () => JobStep.find({}),

    partStep: (root, { id }) => PartStep.findById(id),

    partSteps: () => PartStep.find({}),

    form: (root, { id, name }) => {
      if (!id && !name) throw Error("Must provide id or name")
      return Form.findByIdOrName(id ? id : name)
    },

    forms: () => Form.find({}),

    validator: (root, { id, name }) => {
      if (!id && !name) throw Error("Must provide id or name")
      return Validator.findByIdOrName(id ? id : name)
    },

    validators: () => Validator.find({}),

    validatorModules: () => {
      const files = fs.readdirSync("./validators")
      array = []
      for (var file of files) array.push({fileName: file})
      return array
    },

    comment: (root, { id }) => Comment.findById(id),

    comments: () => Comment.find({})
  },

  Mutation: {
    createUser: async (root, { input }, { self }) => {
      if (!await userHasRoles(self, "admin")) throw Error("Not authorized")
      return new User(input).save()
    },

    editUser: async (root, { input }, { self }) => {
      const { user, username, email, employeeId, password } = input
      user = await User.findByIdOrName(user)
      if (!user) throw Error("User not found")
      if (user.id != self.id && !await userHasRoles(self, "admin")) throw Error("Not authorized")
      if (username) user.username = username
      if (email) user.email = email
      if (employeeId) user.employeeId = employeeId
      if (password) user.password = password
      return user.save()
    },

    disableUser: async (root, { input }, { self }) => {
      const { user } = input
      user = await User.findByIdOrName(user)
      if (!user) throw Error("User not found")
      if (!await userHasRoles(self, "admin")) throw Error("Not authorized")
      user.enabled = false
      return user.save()
    },

    enableUser: async (root, { input }, { self }) => {
      const { user } = input
      user = await User.findByIdOrName(user)
      if (!user) throw Error("User not found")
      if (!await userHasRoles(self, "admin")) throw Error("Not authorized")
      user.enabled = true
      return user.save()
    },

    createRole: async (root, { input }, { self }) => {
      const { name, users } = input
      //Admin role needs a way to be created initially
      
      if (!(name.toLowerCase() === "admin") && !await userHasRoles(self, "admin"))
       throw Error("Not authorized")
      const userIds = []
      if (users) {
        for (var user of users) {
          user = await User.findByIdOrName(user)
          if (!user) throw Error("User not found")
          if (!userIds.includes(user.id)) userIds.push(user.id)
        }
      }
      return new Role({ name, userIds }).save()
    },

    editRole: async (root, { input }, { self }) => {
      const { role, name, users } = input
      if (!await userHasRoles(self, "admin")) throw Error("Not authorized")
      role = await Role.findByIdOrName(role)
      if (!role) throw Error("Role not found")
      if (name) role.name = name
      if (users) {
        role.userIds = []
        for (var user of users) {
          user = await User.findByIdOrName(user)
          if (!user) throw Error("User not found")
          if (!role.Ids.includes(user.id)) role.userIds.push(user.id)
        }
      }
      return role.save()
    },

    addUserToRole: async (root, { input }, { self }) => {
      const { user, role } = input
      if (!await userHasRoles(self, "admin")) throw Error("Not authorized")
      user = await User.findByIdOrName(user)
      if (!user) throw Error("User not found")
      role = await Role.findByIdOrName(role)
      if (!role) throw Error("Role not found")
      if (role.userIds.includes(user.id))
        throw Error("User already assigned to role")
      role.userIds.push(user.id)
      return role.save()
    },

    removeUserFromRole: async (root, { input }, { self }) => {
      const { user, role } = input
      if (!await userHasRoles(self, "admin")) throw Error("Not authorized")
      user = await User.findByIdOrName(user)
      if (!user) throw Error("User not found")
      role = await Role.findByIdOrName(role)
      if (!role) throw Error("Role not found")
      if (!role.userIds.includes(user.id))
        throw Error("User not assigned to role")
      role.userIds = role.userIds.filter(id => id != user.id)
      return role.save()
    },

    createCustomer: async (root, { input }, { self }) => {
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      return new Customer(input).save()
    },

    editCustomer: async (root, { input }, { self }) => {
      const { customer, name, enabled } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      customer = await Customer.findByIdOrName(customer)
      if (!customer) throw Error("Customer not found")
      if (name) customer.name = name
      if (enabled) customer.enabled = enabled
      return customer.save()
    },

    disableCustomer: async (root, { input }, { self }) => {
      const { customer } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      customer = await Customer.findByIdOrName(customer)
      if (!customer) throw Error("Customer not found")
      customer.enabled = false
      return customer.save()
    },

    enableCustomer: async (root, { input }, { self }) => {
      const { customer } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      customer = await Customer.findByIdOrName(customer)
      if (!customer) throw Error("Customer not found")
      customer.enabled = true
      return customer.save()
    },

    createPart: async (root, { input }, { self }) => {
      const { name, customer } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      customer = await Customer.findByIdOrName(customer)
      if (!customer) throw Error("Customer not found")
      return new Part({ customerId: customer.id, name }).save()
    },

    editPart: async (root, { input }, { self }) => {
      const { id, name, customer, enabled } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      const part = await Part.findById(id)
      if (!part) throw Error("Part not found")
      if (customer) {
        customer = await Customer.findByIdOrName(customer)
        if (!customer) throw Error("Customer not found")
        part.customerId = customer.id
      }
      if (name) part.name = name
      if (enabled) part.enabled = enabled
      return part.save()
    },

    disablePart: async (root, { input }, { self }) => {
      const { id } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      const part = await Part.findById(id)
      if (!part) throw Error("Part Not Found")
      part.enabled = false
      return part.save()
    },

    enablePart: async (root, { input }, { self }) => {
      const { id } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      const part = await Part.findById(id)
      if (!part) throw Error("Part not found")
      part.enabled = true
      return part.save()
    },

    addStepToPart: async (root, { input }, { self }) => {
      const { part, stepType, prevStepIds } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")

      part = await Part.findByIdOrNo(part)
      if (!part) throw Error("Part not found")

      stepType = await StepType.findByIdOrName(stepType)
      if (!stepType) throw Error("StepType not found")
      if (!stepType.enabled) throw Error("Cannot add step to part. StepType is disabled")

      if(prevStepIds){
        const prevSteps = await PartStep.find({_id: {$in: prevStepIds}})
        if (prevSteps.length != prevStepIds.length) throw Error("Previous Step not found")
        for (var prevStep of prevSteps)
          if (!prevStep.enabled) throw Error("Cannot add step to part. Previous step is disabled")
      }
      
      await new PartStep({
        partId: part.id,
        stepTypeId: stepType.id,
        prevStepIds
      }).save()

      return part
    },

    removeStepFromPart: async (root, { input }, { self }) => {
      const { id } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")

      const stepToRemove = await PartStep.findById(id)
      if (!stepToRemove) throw Error ("PartStep not found")

      const part = await Part.findById(stepToRemove.partId)

      for (var stepToUpdate of await PartStep.find({prevStepIds: stepToRemove.id})) {
        stepToUpdate.prevStepIds = stepToUpdate.prevStepIds.filter(id => id != stepToRemove.id)
        for(var stepId of stepToRemove.prevStepIds) stepToUpdate.prevStepIds.push(stepId)
        await stepToUpdate.save()
      }
      await stepToRemove.remove()

      return part
    },

    disablePartStep: async (root, { input }, { self }) => {
      const { id } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      const partStep = await PartStep.findByIdOrName(id)
      if (!partStep) throw Error("PartStep not found")
      partStep.enabled = false
      return partStep.save()
    },

    enablePartStep: async (root, { input }, { self }) => {
      const { id } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      const partStep = await PartStep.findByIdOrName(id)
      if (!partStep) throw Error("PartStep not found")
      partStep.enabled = true
      return partStep.save()
    },

    createJob: async (root, { input }, { self }) => {
      const { jobNo, customer, partId } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")

      const part = await Part.findById(partId)
      if (!part) throw Error("Part not found")
      if (!part.enabled) throw Error(`Cannot create job for part ${part.name}. Part is disabled`)

      customer = await Customer.findByIdOrName(customer)
      if (!customer) throw Error("Customer not found")
      if (!customer.enabled) throw Error(`Cannot create job for customer ${customer.name}. Customer disabled.`)

      return new Job({
        jobNo,
        customerId: customer.id,
        partId
      }).save()
    },

    editJob: async (root, { input }, { self }) => {
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      const { job, jobNo, customer, partId, status, enabled, location } = input

      job = await Job.findByIdOrNo(job)
      if (!job) throw Error("Job not found")

      if (jobNo) job.jobNo = jobNo
      if (customer) {
        customer = await Customer.findByIdOrName(customer)
        if (!customer) throw Error("Customer not found")
        job.customerId = customer.id
      }
      if (partId) {
        const part = await Part.findById(partId)
        if (!part) throw Error("Part not found")
        job.partId = partId
      }
      if (status) job.status = status
      if (enabled) job.enabled = enabled
      if (location) {
        const location = await Location.findByIdOrName(location)
        if(!location) throw Error("Location not found")
      }
      return job.save()
    },

    moveJob: async (root, { input }, { self }) => {
      const { job, location } = input
      job = await Job.findByIdOrNo(job)
      if(!job) throw Error("Job not found")
      location = await Location.findByIdOrName(location)
      if(!location) throw Erorr("Location not found")
      job.locationId = location.id
      return job.save()
    },

    disableJob: async (root, { input }, { self }) => {
      const { job } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      job = await Job.findByIdOrNo(job)
      if (!job) throw Error("Job not found")
      job.enabled = false
      return job.save()
    },

    enableJob: async (root, { input } , { self }) => {
      const { job } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      job = await Job.findByIdOrNo(job)
      if (!job) throw Error("Job not found")
      job.enabled = true
      return job.save()
    },

    addStepToJob: async (root, { input }, { self }) => {
      const { job, stepType, prevStepIds } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")

      job = await Job.findByIdOrNo(job)
      if (!job) throw Error("Job not found")

      stepType = await StepType.findByIdOrName(stepType)
      if (!stepType) throw Error("StepType not found")
      if (!stepType.enabled) throw Error("Cannot add step to job. StepType is disabled")

      if (prevStepIds){
        const prevSteps = await JobStep.find({_id: {$in: prevStepIds} })
        if (prevSteps.length != prevStepIds.length) throw Error ("Previous step not found")
        for (var prevStep of prevSteps) 
          if (!prevStep.enabled) throw Error ("Cannot add step to job. Previous step is disabled")
      }
      

      await new JobStep({
        jobId: job.id,
        stepTypeId: stepType.id,
        prevStepIds
      }).save()
      return job
    },

    removeStepFromJob: async (root, { input }, { self }) => {
      const { id } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")

      const stepToRemove = await JobStep.findById(id)
      if (!stepToRemove) throw Error("JobStep not found")
      const job = await Job.findById(stepToRemove.jobId)

      for (var stepToUpdate of await JobStep.find({ prevStepIds: id })) {
        stepToUpdate.prevStepIds = stepToUpdate.prevStepIds.filter(id => id != stepToRemove.id)
        for (var prevStepId of stepToRemove.prevStepIds) stepToUpdate.prevStepIds.push(prevStepId)
        await stepToUpdate.save()
      }
      await stepToRemove.remove()
      
      return job
    },

    completeJobStep: async (root, { input }, { self }) => {
      const { id, data } = input
      if (!self) throw Error("Must be logged in to complete job steps")

      const jobStep = await JobStep.findById(id)
      if (!jobStep) throw Error("JobStep not found")
      if (jobStep.completed) throw Error("Cannot complete job step. Step is already complete")

      const job = await Job.findById(jobStep.jobId)
      if (!job) throw Error("Internal Error. Job not found")
      if (!job.enabled) throw Error("Cannot complete job steps. Job is disabled")

      if (!jobStep.prevStepsCompleted) throw Error("Cannot complete job step. Previous step must be completed first")
        
      const stepType = await StepType.findById(jobStep.stepTypeId)
      if (!stepType) throw Error("Internal Error. StepType not found.")

      if (stepType.requiredRoleIds && stepType.requiredRoleIds.length > 0) {
        const roles = await Role.find({_id: { $in: stepType.requiredRoleIds }})
        if (!await userHasRoles(self, roles)) throw Error("Cannot complete job step. User does not have a required role")
      }

      if (stepType.formId) {
        jobStep.formData = []
        const form = await Form.findById(stepType.formId)
        if (!form) throw Error("Internal Error. Form not found.")
        if (!form.enabled) form.data = [{ instructions: "Basic input form: Enter data to complete job step." }]
        for (var [index, dataItem] of form.data.entries()) {
          if (!data[index])  throw Error(`Form input index [${index}] not found`)
          if (dataItem.regEx) {
            if (!data[index].match(dataItem.regEx)) throw Error(`RegEx check failed on input index [${index}]: ${data[index]}`)
          }
          if (dataItem.validatorId) {
            const validator = await Validator.findById(dataItem.validatorId)
            if (!validator) throw Error("Internal Error. Validator not found.")
            if (!validator.enabled) validator.moduleName = "DEFAULT"
            if (!validator.execute(data[index])) throw Error( `Validator check failed on input [${index}]: ${data[index]}`)
          }
          jobStep.formData.push(data[index])
        }
      }

      jobStep.completed = true
      jobStep.completedById = self.id
      jobStep.timeCompleted = Date.now()
      jobStep.save()
      return job
    },

    disableJobStep: async (root, { input }, { self }) => {
      const { id } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      const jobStep = await JobStep.findByIdOrName(id)
      if (!jobStep) throw Error("JobStep not found")
      jobStep.enabled = false
      return jobStep.save()
    },

    enableJobStep: async (root, { input }, { self }) => {
      const { id } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      const jobStep = await JobStep.findByIdOrName(id)
      if (!jobStep) throw Error("JobStep not found")
      jobStep.enabled = true
      return jobStep.save()
    },

    createStepType: async (root, { input }, { self }) => {
      const { name, description, instructions, form, requiredRoles } = input
      if (!(await userHasRoles(self, ["admin", "engineer"]))) throw Error("Not authorized")
      const stepType = {
        name,
        description,
        instructions,
        requiredRoleIds: []
      }
      if (form) {
        form = await Form.findByIdOrName(form)
        if (!form) throw Error("Form not found")
        if (!form.enabled) throw Error("Cannot create step type. Form is disabled")
        stepType.formId = form.id
      }
      for (var role of requiredRoles ? requiredRoles : []) {
        role = await Role.findByIdOrName(role)
        if (!role) throw Error("Role not found")
        if (!stepType.requiredRoleIds.includes(role.id))
          stepType.requiredRoleIds.push(role.id)
      }
      return new StepType(stepType).save()
    },

    editStepType: async (root, { input }, { self }) => {
      const { stepType, name, description, instructions, form, requiredRoles, enabled } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")

      stepType = await StepType.findByIdOrName(stepType)
      if (!stepType) throw Error("StepType not found")

      if (name) stepType.name = name
      if (description) stepType.description = description
      if (instructions) stepType.instructions = instructions
      if (enabled) stepType.enabled = enabled
      if (form) {
        form = await Form.findByIdOrName(args.form)
        if (!form) throw Error("Form not found")
        if (!form.enabled) throw Error("Cannot edit step type. Form is disabled")
        stepType.formId = form.id
      }
      const requiredRoleIds = []
      if (requiredRoles) {
        for (var requiredRole of args.requiredRoles) {
          const role = await Role.findByIdOrName(requiredRole)
          if (!role) throw Error("Role not found")
          if (!requiredRoleIds.includes(role.id)) requiredRoleIds.push(role.id)
        }
        stepType.requiredRoleIds = requiredRoleIds
      }
      return stepType.save()
    },

    addRoleToStepType: async (root, { input }, { self }) => {
      const { stepType, role } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      stepType = await StepType.findByIdOrName(stepType)
      if (!stepType) throw Error("StepType not found")
      role = await Role.findByIdOrName(role)
      if (!role) throw Error("Role not found")
      if (stepType.requiredRoleIds.includes(role.id)) throw Error("Role already in list of required roles for step type")
      stepType.requiredRoleIds.push(role.id)
      return stepType.save()
    },

    removeRoleFromStepType: async (root, { input }, { self }) => {
      const { stepType, role } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      stepType = await StepType.findByIdOrName(stepType)
      if (!stepType) throw Error("StepType not found")
      role = await Role.findByIdOrName(role)
      if (!role) throw Error("Role not found")
      if (!stepType.requiredRoleIds.includes(role.id)) throw Error("Role not in list of required roles for step type")
      stepType.requiredRoleIds = stepType.requiredRoleIds.filter(id => id != role.id)
      return stepType.save()
    },

    disableStepType: async (root, { input }, { self }) => {
      const { stepType } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      stepType = await StepType.findByIdOrName(stepType)
      if (!stepType) throw Error("StepType not found")
      stepType.enabled = false
      return stepType.save()
    },

    enableStepType: async (root, { input }, { self }) => {
      const { stepType } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      stepType = await StepType.findByIdOrName(stepType)
      if (!stepType) throw Error("StepType not found")
      stepType.enabled = true
      return stepType.save()
    },

    createForm: async (root, { input }, { self }) => {
      const { name, data, description } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      if (data.length == 0) throw Error("Must provide FormInput type to data argument")
      for (var dataItem of data) {
        if (dataItem.regEx && !isValidRegEx(dataItem.regEx)) throw Error("Error: RegEx did not compile")
        if (dataItem.validator) {
          const validator = await Validator.findByIdOrName(dataItem.validator)
          if (!validator) throw Error("Validator not found")
          if (!validator.enabled) throw Error("Cannot create form. Validator is disabled")
          dataItem.validatorId = validator.id //args.data has validator, need to set validatorId
        }
      }
      return new Form({ name, data, description }).save()
    },

    editForm: async (root, { input }, { self }) => {
      const { form, name, data, description, enabled } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")

      form = await Form.findByIdOrName(form)
      if (!form) throw Error("Form not found")

      if (name) form.name = name
      if (description) form.description = description
      if (enabled) form.enabled = enabled
      if (data) {
        if (data.length == 0) throw Error("Must provide FormInput type to data argument")
        for (var dataItem of data) {
          if (dataItem.regEx && !isValidRegEx(dataItem.regEx)) throw Error("Error: RegEx did not compile")
          if (dataItem.validator) {
            const validator = await Validator.findByIdOrName(dataItem.validator)
            if (!validator) throw Error("Validator not found")
            if (!validator.enabled)
              throw Error("Cannot create form. Validator is disabled")
            dataItem.validatorId = validator.id //args.data has validator, need to set validatorId
          }
        }
        form.data = data
      }
      return form.save()
    },

    disableForm: async (root, { input }, { self }) => {
      const { form } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      form = await Form.findByIdOrName(form)
      if (!form) throw Error("Form not found")
      form.enabled = false
      form.save()
    },

    enableForm: async (root, { input }, { self }) => {
      const { form } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      form = await Form.findByIdOrName(form)
      if (!form) throw Error("Form not found")
      form.enabled = true
      form.save()
    },

    createValidator: async (root, { input }, { self }) => {
      const { moduleName, description } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      try {
        const validatorModule = require(`./validators/${moduleName}`)
        validatorModule("testforcrash")
      } catch (e) {
        throw Error("Error loading module")
      }
      return new Validator({ moduleName, description }).save()
    },

    editValidator: async (root, { input }, { self }) => {
      const { validator, moduleName, description, enabled } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      validator = await Validator.findByIdOrName(validator)
      if (!validator) throw Error("Validator not found")
      if (moduleName) {
        try {
          const validatorModule = require(`./validators/${moduleName}`)
          validatorModule("testforcrash")
          validator.moduleName = moduleName
        } catch (e) {
          throw Error("Error loading module")
        }
      }
      if (description) validator.description = description
      if (enabled) validator.enabled = enabled
      return validator.save()
    },

    disableValidator: async (root, { input }, { self }) => {
      const { validator } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      validator = await Validator.findByIdOrName(validator)
      if (!validator) throw Error("Validator not found")
      validator.enabled = false
      return validator.save()
    },

    enableValidator: async (root, { input }, { self }) => {
      const { validator } = input
      if (!await userHasRoles(self, ["admin", "engineer"])) throw Error("Not authorized")
      validator = await Validator.findByIdOrName(validator)
      if (!validator) throw Error("Validator not found")
      validator.enabled = true
      return validator.save()
    },

    createComment: async (root, { input }, { self }) => {
      const { subjectId, data } = input
      if (!self) throw Error("User not found")
      const comment = await Comment.findOne({_id: subjectId})
      if (comment && !comment.enabled) throw Error("Cannot reply to comment. Comment is disabled")
      return new Comment({ subjectId, data, userId: self.id }).save()
    },

    editComment: async (root, { input }, { self }) => {
      const { id, data, enabled } = input
      const comment = await Comment.findById(id)
      if (!comment) throw Error("Comment not found")

      const user = await User.find({ id: comment.userId })
      if (!user) throw Error("Internal Error. User not found.")
      if (!user.id == self.id) throw Error("Not authorized")

      if (data) {
        comment.edits.push(data)
        comment.editTimes.push(Date.now())
      }
      if (enabled) comment.enabled = enabled
      return comment.save()
    },

    disableComment: async (root, { input }, { self }) => {
      const { id } = input
      const comment = await Comment.findById(id)
      if (!comment) throw Error("Comment not found")
      if (comment.userId != self.id && !await userHasRoles(self, "admin")) throw Error("Not authorized")
      comment.enabled = false
      return comment.save()
    },

    enableComment: async (root, { input }, { self }) => {
      const { id } = input
      const comment = await Comment.findById(id)
      if (!comment) throw Error("Comment not found")
      if (comment.userId != self.id && !await userHasRoles(self, "admin")) throw Error("Not authorized")
      comment.enabled = true
      return comment.save()
    }
  }
}