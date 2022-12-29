import fastifyPlugin from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

const plugin = fastifyPlugin(
  app => {
    const prisma = new PrismaClient();
    app.decorate("db", prisma);
  },
  {
    fastify: "4.x",
    name: "@groovox/database"
  }
);

export default plugin;

declare module "fastify" {
  export interface FastifyInstance {
    db: PrismaClient;
  }
}
