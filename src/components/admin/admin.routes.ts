import * as schema from "./admin.schema";
import { Router } from "express";
import AdminController from "./admin.controller";
import { validateBody } from "../../middleware/validate";
import { authenticateAdmin } from "../../middleware/admin-auth";

const adminRouter = Router();
adminRouter.post(
  "/guest/create",
  authenticateAdmin,
  validateBody(schema.createGuestSchema),
  AdminController.createGuest,
);

adminRouter.post(
  "/bouncer/pin",
  authenticateAdmin,
  validateBody(schema.bouncerPinSchema),
  AdminController.updateBouncerPin,
);

adminRouter.post(
  "/auth/password",
  authenticateAdmin,
  validateBody(schema.adminPasswordSchema),
  AdminController.updateAdminPassword,
);

adminRouter.get("/guests", authenticateAdmin, AdminController.getGuests);

adminRouter.get("/guest/:id", authenticateAdmin, AdminController.getGuest);

adminRouter.get(
  "/dashboard/stats",
  authenticateAdmin,
  AdminController.adminDashboardStats,
);

adminRouter.put(
  "/guest/:id",
  authenticateAdmin,
  validateBody(schema.updateGuestSchema),
  AdminController.updateGuest,
);

adminRouter.post(
  "/auth",
  validateBody(schema.adminPasswordSchema),
  AdminController.adminAuthentication,
);

adminRouter.post(
  "/bouncer/auth",
  validateBody(schema.bouncerPinSchema),
  AdminController.bouncerAuthentication,
);

export default adminRouter;
