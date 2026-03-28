import { employeeRepository } from "../repositories/employeeRepository";

/**
 * Service for employee business logic.
 */
export const employeeService = {
  /**
   * Get all employees.
   */
  async getAllEmployees() {
    return employeeRepository.getAll();
  },
};