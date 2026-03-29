import { NextFunction, Request, Response } from "express";
import ExpressResponse from "../../lib/response";
import { statusCode } from "../../lib/httpstatuscode";
import MiscService from "./service";

const miscService = new MiscService();
class MiscController {
  static async createOrGetHealth(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "health check created or fetched",
        await miscService.createOrGetHealthCheck(),
      );
    } catch (error) {
      console.log("error -> ", error);
      return ExpressResponse.error(
        res,
        statusCode.SERVER_ERROR,
        "Error processing request",
      );
    }
  }
}

export default MiscController;
