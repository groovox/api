import fastifyPlugin from "fastify-plugin";
import { createYoga } from "graphql-yoga";

import type { FastifyReply, FastifyRequest } from "fastify";
import type { YogaServerInstance } from "graphql-yoga";

type ServerContext = {
  req: FastifyRequest;
  reply: FastifyReply;
};

type UserContext = Record<string, unknown>;

const pluginName = "@groovox/graphql";

const plugin = fastifyPlugin(
  app => {
    const logger = app.log.child({ plugin: pluginName });
    const yoga = createYoga<ServerContext, UserContext>({
      logging: {
        debug: (...args) => args.forEach(arg => logger.debug(arg)),
        info: (...args) => args.forEach(arg => logger.info(arg)),
        warn: (...args) => args.forEach(arg => logger.warn(arg)),
        error: (...args) => args.forEach(arg => logger.error(arg))
      }
    });
    app.decorate("gql", yoga);
  },
  {
    fastify: "4.x",
    name: pluginName,
    dependencies: ["@groovox/database"]
  }
);

export default plugin;

declare module "fastify" {
  export interface FastifyInstance {
    gql: YogaServerInstance<ServerContext, UserContext>;
  }
}
