import { Router } from "express";
import employeeController from "../controllers/employeeController";
import { requireUserAuth } from "../middleware/requireUserAuth";

const employeeRoutes = Router();

employeeRoutes.get("/", employeeController.getAllEmployees);
employeeRoutes.post("/", requireUserAuth, employeeController.createEmployee);

export default employeeRoutes;