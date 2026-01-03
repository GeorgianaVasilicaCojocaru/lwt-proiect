require('dotenv').config()
const { ApolloServer } = require("apollo-server")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: ({req}) => {
    const auth = req.headers.authorization || ''
        if (auth.startsWith('Bearer ')) {
          const token = auth.replace('Bearer ', '')
          try {
            const user = jwt.verify(token, SECRET)
            return { user }
          } catch (err) {
            console.log('Invalid token')
          }
        }
        return {}
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
