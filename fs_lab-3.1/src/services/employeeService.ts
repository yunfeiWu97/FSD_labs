import { employeeRepo } from "../repositories/employeeRepo";

export type CreateEmployeeInput = {
  firstName: string;
  department: string;
  departments: string[]; 
};

export type CreateEmployeeErrors = {
  firstName?: string[];
  department?: string[];
};

export type CreateEmployeeResult =
  | { ok: true }
  | { ok: false; errors: CreateEmployeeErrors };

export const employeeService = {
  tryCreateEmployee(input: CreateEmployeeInput): CreateEmployeeResult {
    const errors: CreateEmployeeErrors = {};

    const trimmedFirstName = input.firstName.trim();
    const trimmedDepartment = input.department.trim();

    if (trimmedFirstName.length < 3) {
      errors.firstName = ["First name must be at least 3 characters."];
    }

    if (!input.departments.includes(trimmedDepartment)) {
      errors.department = ["Please select an existing department."];
    }

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    employeeRepo.createEmployee(trimmedFirstName, trimmedDepartment);
    return { ok: true };
  },
};
