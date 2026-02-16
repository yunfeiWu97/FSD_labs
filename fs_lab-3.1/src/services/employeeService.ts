// src/services/employeeService.ts
import { employeeRepo } from "../repositories/employeeRepo";

export type CreateEmployeeInput = {
  firstName: string;
  department: string;
  validDepartments: string[]; // array of department names/keys
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

    if (trimmedFirstName.length < 3) {
      errors.firstName = ["First name must be at least 3 characters."];
    }

    const departmentExists = input.validDepartments.includes(input.department);
    if (!departmentExists) {
      errors.department = ["Please select a valid department."];
    }

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    employeeRepo.createEmployee(trimmedFirstName, input.department);
    return { ok: true };
  },
};
