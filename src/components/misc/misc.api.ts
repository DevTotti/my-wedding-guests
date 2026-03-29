import { Router } from "express";
import MiscController from "./misc.controller";

const miscRouter = Router();

miscRouter.get("/health-check", MiscController.createOrGetHealth);

export default miscRouter;
