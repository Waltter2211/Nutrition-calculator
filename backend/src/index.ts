import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { connectDB } from "./db.js";
import { resolvers } from "./resolver.js";
import { typeDefs } from "./schema.js";
import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";

const app = express();
const httpServer = http.createServer(app);

// Function for creating a Apollo server instance
const createApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:4200", "http://localhost:4201", "https://studio.apollographql.com"],
    }),
    express.json(),
    expressMiddleware(server)
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  // Connect to db function
  await connectDB();
};

createApolloServer();
