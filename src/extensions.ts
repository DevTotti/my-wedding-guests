import { response } from "express";
import httpStatusCodes from "http-status-codes";

// augment the `express-serve-static-core` module
declare module "express-serve-static-core" {
  // first, declare that we are adding a method to `Response` (the interface)
  export interface Response {
    successResponse(
      message: string,
      status?: number,
      data?: Record<string, unknown>,
    ): this;
    errorResponse(
      message: string,
      status?: number,
      data?: Record<string, unknown>,
    ): this;
  }
}

// now actually add it to `response` (the prototype)
response.successResponse = function (
  message: string,
  status?: number,
  data?: Record<string, unknown> | [],
) {
  return this.status(status || httpStatusCodes.OK).json({
    status: true,
    message: message,
    data,
  });
};

response.errorResponse = function (
  message: string,
  status?: number,
  data?: Record<string, unknown> | [],
) {
  return this.status(status || httpStatusCodes.BAD_REQUEST).json({
    status: false,
    message: message,
    data,
  });
};
