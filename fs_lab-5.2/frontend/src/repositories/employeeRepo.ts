// src/repositories/employeeRepo.ts
import type { Employee } from "../types/employee";

const EMPLOYEE_API_URL = "http://localhost:3001/api/employees";

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
  async getEmployees(): Promise<Employee[]> {
    const response = await fetch(EMPLOYEE_API_URL);

    if (!response.ok) {
      throw new Error("Unable to load employees.");
    }

    return response.json();
  },

  async getEmployeesGroupedByDepartment(): Promise<DepartmentEmployeesMap> {
    const employees = await this.getEmployees();
    return groupByDepartment(employees);
  },

  async createEmployee(firstName: string, department: string): Promise<Employee> {
    const response = await fetch(EMPLOYEE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName: "",
        department,
        role: "",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to create employee.");
    }

    return data;
  },
};