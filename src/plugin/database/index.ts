import fastifyPlugin from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

const pluginName = "@groovox/database";

const plugin = fastifyPlugin(
  app => {
    const logger = app.log.child({ plugin: pluginName });
    const prisma = new PrismaClient({
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" }
      ]
    });
    prisma.$on("query", e => {
      const { query, params, duration } = e;
      logger.debug({ query, params, duration });
    });
    prisma.$on("error", e => {
      const { message } = e;
      logger.error(message);
    });
    prisma.$on("info", e => {
      const { message } = e;
      logger.info(message);
    });
    prisma.$on("warn", e => {
      const { message } = e;
      logger.warn(message);
    });
    app.decorate("db", prisma);
  },
  {
    fastify: "4.x",
    name: pluginName
  }
);

export default plugin;

declare module "fastify" {
  export interface FastifyInstance {
    db: PrismaClient;
  }
}
