import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Config } from "../config";
import ExpressResponse from "../lib/response";
import { statusCode } from "../lib/httpstatuscode";

export const authenticateBouncer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const appKey = req.header("x-app-key");

  if (!appKey) {
    return ExpressResponse.error(
      res,
      statusCode.FORBIDDEN,
      "No app key provided",
    );
  }
  const compareAppKey = appKey === Config.bouncerId;
  if (!compareAppKey) {
    return ExpressResponse.error(res, statusCode.FORBIDDEN, "Invalid app key");
  }
  next();
};
