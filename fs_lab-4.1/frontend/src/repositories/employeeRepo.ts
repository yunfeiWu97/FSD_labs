// src/repositories/employeeRepo.ts
import type { Employee } from "../types/employee";
import { employees as initialEmployees } from "../data/employees";

/**
 * In-memory temporary storage
 * Repo is the single source of truth for Employees data access.
 */
let employeesStore: Employee[] = structuredClone(initialEmployees);

export type DepartmentEmployeesMap = Record<string, Employee[]>;

function groupByDepartment(employees: Employee[]): DepartmentEmployeesMap {
  return employees.reduce<DepartmentEmployeesMap>((result, employee) => {
    const department = employee.department; 
    const currentList = result[department] ?? [];
    result[department] = [...currentList, employee];
    return result;
  }, {});
}

export const employeeRepo = {
  getEmployees(): Employee[] {
    return structuredClone(employeesStore);
  },

  getEmployeesGroupedByDepartment(): DepartmentEmployeesMap {
    return structuredClone(groupByDepartment(employeesStore));
  },

  createEmployee(firstName: string, department: string): Employee {
    const newEmployee: Employee = {
      firstName,
      department,
    };

    employeesStore = [...employeesStore, newEmployee];
    return structuredClone(newEmployee);
  },
};
