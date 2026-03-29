import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Config } from "../config";
import ExpressResponse from "../lib/response";
import { statusCode } from "../lib/httpstatuscode";
import helper from "../lib/helper";

export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const appKey = req.header("x-app-id");

  if (!appKey) {
    return ExpressResponse.error(
      res,
      statusCode.FORBIDDEN,
      "No app key provided",
    );
  }
  const compareAppKey = appKey === Config.clientId;
  if (!compareAppKey) {
    return ExpressResponse.error(res, statusCode.FORBIDDEN, "Invalid app key");
  }
  next();
};
