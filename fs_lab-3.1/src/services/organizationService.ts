import { organizationRepo } from "../repositories/organizationRepo";
import type { OrganizationRecord } from "../types/organization";

export type CreateOrganizationInput = {
  firstName: string;
  lastName: string;
  role: string;
};

export type CreateOrganizationErrors = {
  firstName?: string[];
  lastName?: string[];
  role?: string[];
};

export type CreateOrganizationResult =
  | { ok: true; updated: OrganizationRecord[] }
  | { ok: false; errors: CreateOrganizationErrors };

export const organizationService = {
  tryCreate(input: CreateOrganizationInput): CreateOrganizationResult {
    const errors: CreateOrganizationErrors = {};

    const firstName = input.firstName.trim();
    const lastName = input.lastName.trim();
    const role = input.role.trim();

    if (firstName.length < 3) {
      errors.firstName = ["First name must be at least 3 characters."];
    }

    if (lastName.length === 0) {
      errors.lastName = ["Last name is required."];
    }

    if (role.length === 0) {
      errors.role = ["Role is required."];
    } else if (organizationRepo.roleIsOccupied(role)) {
      errors.role = ["This role is already occupied."];
    }

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    const updated = organizationRepo.create({ firstName, lastName, role });
    return { ok: true, updated };
  },
};