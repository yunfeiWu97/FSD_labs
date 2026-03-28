import { Router } from "express";
import { employeeController } from "../controllers/employeeController";

const employeeRoutes = Router();

employeeRoutes.get("/", employeeController.getAllEmployees);
employeeRoutes.post("/", employeeController.createEmployee);

export default employeeRoutes;
