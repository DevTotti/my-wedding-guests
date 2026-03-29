import { Router } from "express";
import GuestController from "./guest.controller";
import { authenticateBouncer } from "../../middleware/bouncer-auth";

const guestRouter = Router();
guestRouter.use(authenticateBouncer);
guestRouter.get("/:reference", GuestController.getGuest);
guestRouter.put("/:reference", GuestController.bouncerMarkGuest);

export default guestRouter;
