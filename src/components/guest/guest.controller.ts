import { NextFunction, Request, Response } from "express";
import ExpressResponse from "../../lib/response";
import { statusCode } from "../../lib/httpstatuscode";
import GuestService from "./guest.service";

const guestService = new GuestService();

class GuestController {
  static async getGuest(req: Request, res: Response): Promise<Response> {
    try {
      const {
        params: { reference },
      } = req;
      const guest = await guestService.getGuestByReference(reference);
      if (!guest) {
        return ExpressResponse.error(
          res,
          statusCode.NOT_FOUND,
          "Guest not found",
        );
      }
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Driver profile fetched",
        guest,
      );
    } catch (error) {
      console.log("error on getGuest -> ", error);
      return ExpressResponse.error(
        res,
        statusCode.SERVER_ERROR,
        "Error processing request",
      );
    }
  }

  static async bouncerMarkGuest(req: Request, res: Response) {
    try {
      const {
        params: { reference },
      } = req;
      const guest = await guestService.getGuestByReference(reference);
      if (!guest) {
        return ExpressResponse.error(
          res,
          statusCode.NOT_FOUND,
          "Guest not found",
        );
      }
      const result = await guestService.updateGuest(Number(guest.id), {
        attended: true,
        attendedAt: new Date(),
      });
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Guest updated successfully",
        result,
      );
    } catch (error) {
      console.error("error on updateGuest -> ", error);
      return ExpressResponse.error(
        res,
        statusCode.SERVER_ERROR,
        "Error processing request",
      );
    }
  }
}

export default GuestController;
