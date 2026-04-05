import { Router } from "express";
import { organizationController } from "../controllers/organizationController";

const organizationRoutes = Router();

organizationRoutes.get("/", organizationController.getAllRecords);
organizationRoutes.post("/", organizationController.createRecord);

export default organizationRoutes;
