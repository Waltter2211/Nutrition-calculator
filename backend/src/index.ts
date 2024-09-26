import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connectDB } from './db.js'
import { resolvers } from './resolver.js';
import { typeDefs } from './schema.js';

// Function for creating a Apollo server instance
const createApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.log(`🚀  Server ready at: ${url}`)
  // Connect to db function
  await connectDB()
}

createApolloServer()