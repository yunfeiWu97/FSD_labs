import { Request, Response } from "express";
import { employeeService } from "../services/employeeService";

/**
 * Controller for employee requests.
 */
export const employeeController = {
  /**
   * Handle request to get all employees.
   */
  getAllEmployees(_request: Request, response: Response): void {
    const employees = employeeService.getAllEmployees();
    response.status(200).json(employees);
  },

  /**
   * Handle request to create a new employee.
   */
  createEmployee(request: Request, response: Response): void {
    try {
      const newEmployee = employeeService.createEmployee(request.body);
      response.status(201).json(newEmployee);
    } catch (error) {
      response.status(400).json({
        message:
          error instanceof Error ? error.message : "Unable to create employee.",
      });
    }
  },
};
