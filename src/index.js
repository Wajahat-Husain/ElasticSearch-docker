const express = require('express')
const { connectToElastic } = require('./elasticsearch_config/index')
const v1BlockchainRouter = require('./v1/routes/blockchainRoutes')
const { ApolloServer, gql } = require('apollo-server-express')
const base_schema = require('./graphql/schemas/base_schema')
const base_resolver = require('./graphql/resolvers/base_resolver')
// const { client } = require('./db_connection/index')
const app = express()
app.use(express.json({ limit: '4000mb' }))

const PORT = process.env.PORT || 5000

app.use('/api/blockchain', v1BlockchainRouter)

const server = new ApolloServer({
  typeDefs: base_schema,
  resolvers: base_resolver
})
server
.start()
.then(res => {
  server.applyMiddleware({ app })
  app.listen({ port: PORT }, () => {
      connectToElastic();
      console.log('🚀 Server is Ready')
    })
  })
  .catch(error => {
    console.log(error.message)
  })
