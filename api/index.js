const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const voyagerMiddleware = require("graphql-voyager/middleware").express
const cors = require ("cors")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")
const { authenticateBasic, authenticateJwt } = require("./middleware")
const { port, secretOrKey } = require("./config")
const { User } = require("./models")
const { getUserFromToken, generateLoginToken } = require("./modules")

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks: false,
  context: async ({ req }) => {
    return { 
      self: await getUserFromToken(req.headers.authorization.split(" ")[1])
    }
  },
})

const app = express()

app.use(cors()) //enable ALL cors requests!!
app.use(express.json())

app.use("/register", (req, res, next) => {
  new User(req.body).save()
  .then(user => res.status(201).send(user))
  .catch(e => res.sendStatus(400) && next(e))
})

app.use("/login", authenticateBasic, (req, res, next) => {
  User.findByIdOrName(req.user)
  .then(user => user.enabled
    ? res.send(generateLoginToken(req.user, secretOrKey))
    : res.status(401).send("User disabled")
  )
  .catch(e => res.sendStatus(400) && next(e))
})

app.use("/voyager", authenticateJwt, voyagerMiddleware({ endpointUrl: "/api"}))

app.use("/api", authenticateJwt)
server.applyMiddleware({ app, path: "/api" })

app.listen(port, () =>
  console.log(`🚀 GraphQL API Server running on http://localhost:${port}${server.graphqlPath}`)
)