import { Employee } from "../models/Employee";
import { employeeRepository } from "../repositories/employeeRepository";

/**
 * Service for employee business logic.
 */
export const employeeService = {
  /**
   * Get all employees.
   */
  getAllEmployees(): Employee[] {
    return employeeRepository.getAll();
  },

  /**
   * Validate and create a new employee.
   */
  createEmployee(employee: Omit<Employee, "id">): Employee {
    if (employee.firstName.trim().length < 3) {
      throw new Error("First name must be at least 3 characters long.");
    }

    const existingDepartments = employeeRepository
      .getAll()
      .map((currentEmployee) => currentEmployee.department);

    if (!existingDepartments.includes(employee.department)) {
      throw new Error("Department must match an existing department.");
    }

    return employeeRepository.create(employee);
  },
};
