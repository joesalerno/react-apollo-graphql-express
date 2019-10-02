const mongoose = require("mongoose")
const { mongoURI } = require("../config")

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => { console.log("✔ Connected to MongoDB!") })
  .catch(e => { console.error("❌ Error connecting to MongoDB!") })

module.exports = {
  Customer: require("./customer.model"),
  Job: require("./job.model"),
  Part: require("./part.model"),
  User: require("./user.model"),
  Role: require("./role.model"),
  Comment: require("./comment.model"),
  StepType: require("./stepType.model"),
  JobStep: require("./jobStep.model"),
  PartStep: require("./partStep.model"),
  Form: require("./form.model"),
  Validator: require("./validator.model")
}