require("./extensions");

import errorHandler from "errorhandler";
import app from "./app";
import logger from "./lib/logger";
import { createServer } from "http";

/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

const httpServer = createServer(app);

/**
 * Start Express server.
 */
const server = httpServer.listen(app.get("port"), () => {
  logger.info(
    `\tApp is running at http://localhost:${app.get("port")} in ${app.get(
      "env",
    )} mode`,
  );
  logger.info("\tPress CTRL-C to stop\n");
});

export default server;
