import { fastify } from "fastify";
import { databasePlugin, graphqlPlugin } from "./plugin/index.js";

const app = fastify();
app.register(databasePlugin);
app.register(graphqlPlugin);

app.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});

const start = async (): Promise<void> => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
