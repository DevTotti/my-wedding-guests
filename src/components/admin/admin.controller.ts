import { NextFunction, Request, Response } from "express";
import ExpressResponse from "../../lib/response";
import { statusCode } from "../../lib/httpstatuscode";
import { Config } from "../../config";
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
      await adminService.changeBouncerPin(pin);
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Bouncer PIN Updated Successfully",
        {},
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
  static async updateAdminPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const {
        body: { password },
      } = req;
      const admin = await adminService.getActiveAdmin();
      await adminService.changeAdminPassword(admin.id, password);
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Admin Password Updated Successfully",
        {},
      );
    } catch (error) {
      console.log("error on updateAdminPassword -> ", error);
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
      const guest = await guestService.getGuestById(Number(id));
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
  static async adminDashboardStats(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const dashboard = await adminService.dashboardStats();
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Admin dashboard stats fetched successfully",
        dashboard,
      );
    } catch (error) {
      console.log("error on adminDashboardStats -> ", error);
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
  static async bouncerAuthentication(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const {
        body: { pin },
      } = req;
      const isAuthenticated = await adminService.authenticateBouncerPin(pin);
      if (!isAuthenticated) {
        return ExpressResponse.error(
          res,
          statusCode.UNAUTHORIZED,
          "Invalid PIN",
        );
      }
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Bouncer authenticated successfully",
        Config.bouncerId,
      );
    } catch (error) {
      console.log("error on authenticateBouncer -> ", error);
      return ExpressResponse.error(
        res,
        statusCode.SERVER_ERROR,
        "Error processing request",
      );
    }
  }
  static async adminAuthentication(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const {
        body: { password },
      } = req;
      const isAuthenticated =
        await adminService.authenticateAdminPassword(password);
      if (!isAuthenticated) {
        return ExpressResponse.error(
          res,
          statusCode.UNAUTHORIZED,
          "Invalid Password",
        );
      }
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Admin authenticated successfully",
        Config.clientId,
      );
    } catch (error) {
      console.log("error on authenticateBouncer -> ", error);
      return ExpressResponse.error(
        res,
        statusCode.SERVER_ERROR,
        "Error processing request",
      );
    }
  }
}

export default AdminController;
