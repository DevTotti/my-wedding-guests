import { NextFunction, Request, Response } from "express";
import ExpressResponse from "../../lib/response";
import { statusCode } from "../../lib/httpstatuscode";
import AdminService from "./admin.service";
import GuestService from "../guest/guest.service";

const adminService = new AdminService();
const guestService = new GuestService();

class AdminController {
  static async updateBouncerPin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const {
        body: { pin },
      } = req;
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Bouncer PIN Updated Successfully",
        await adminService.changeBouncerPin(pin),
      );
    } catch (error) {
      console.log("error on createAdminUser -> ", error);
      return ExpressResponse.error(
        res,
        statusCode.SERVER_ERROR,
        "Error processing request",
      );
    }
  }
  static async getGuests(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { query } = req;
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Guests Fetched Successfully",
        await guestService.getGuests(query),
      );
    } catch (error) {
      console.log("error on getGuests -> ", error);
      return ExpressResponse.error(
        res,
        statusCode.SERVER_ERROR,
        "Error processing request",
      );
    }
  }
  static async getGuest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const {
        params: { id },
      } = req;

      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Driver profile fetched",
        await guestService.getGuestById(Number(id)),
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
  static async updateGuest(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await guestService.updateGuest(Number(id), data);
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
  static async createGuest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { body } = req;
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Guest Created Successfully",
        await guestService.createGuest(body),
      );
    } catch (error) {
      console.log("error on createGuest -> ", error);
      return ExpressResponse.error(
        res,
        statusCode.SERVER_ERROR,
        "Error processing request",
      );
    }
  }
}

export default AdminController;
