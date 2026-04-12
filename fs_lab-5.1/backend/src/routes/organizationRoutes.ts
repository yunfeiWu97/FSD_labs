import { Router } from "express";
import organizationController from "../controllers/organizationController";
import { requireUserAuth } from "../middleware/requireUserAuth";

const organizationRoutes = Router();

organizationRoutes.get("/", organizationController.getAllRecords);
organizationRoutes.post("/", requireUserAuth, organizationController.createRecord);

export default organizationRoutes;