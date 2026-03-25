import express, { NextFunction, Request, Response } from "express";
import compression from "compression";
require("express-async-errors");
import logger from "./lib/logger";
import httpStatusCodes from "http-status-codes";
import DBError from "./utils/database";
import session from "express-session";
import cors from "cors";
import "./config";
// import adminRouter from "./components/admin/routes";
// import authenticationRouter from "./components/authentication/routes";
// import rentalRouter from "./components/rentals/routes";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false, // Safer to disable this
    cookie: { secure: process.env.NODE_ENV === "production" }, // Use secure cookies in production
  }),
);

/**
 * Primary app routes.
 */
app.get("/health", (_req, res) =>
  res
    .status(httpStatusCodes.OK)
    .send({ success: true, message: "Health check 200" }),
);

// app.use("/misc", miscRouter);
// app.use("/drop", dropRouter);
// app.use("/admin", adminRouter);

app.all("*", (req, res) => {
  return res.status(httpStatusCodes.NOT_FOUND).json({
    success: false,
    message: "Route not found.",
  });
});

/**
 * Global error handler
 */
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof DBError) {
    logger.error("Database Error:", error);
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Server Error has Occurred.",
      type: "Database error",
    });
  }

  if (error.isAxiosError && error.response) {
    logger.error("Axios Error:", error.response.data);
    return res.status(error.response.status).json({
      success: false,
      data: error.response.data,
    });
  }

  logger.error("Unexpected Error:", error);
  return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Server Error has occurred.",
  });
});

export default app;
