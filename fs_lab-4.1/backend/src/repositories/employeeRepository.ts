import { employeeData } from "../data/employeeData";
import { Employee } from "../models/Employee";

/**
 * Repository for employee data access.
 */
export const employeeRepository = {
  /**
   * Get all employees.
   */
  getAll(): Employee[] {
    return employeeData;
  },

  /**
   * Create a new employee.
   */
  create(employee: Omit<Employee, "id">): Employee {
    const newEmployee: Employee = {
      id: employeeData.length + 1,
      ...employee,
    };

    employeeData.push(newEmployee);
    return newEmployee;
  },
};
