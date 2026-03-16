import { OrganizationRecord } from "../models/OrganizationRecord";
import { organizationRepository } from "../repositories/organizationRepository";

/**
 * Service for organization business logic.
 */
export const organizationService = {
  /**
   * Get all organization records.
   */
  getAllRecords(): OrganizationRecord[] {
    return organizationRepository.getAll();
  },

  /**
   * Validate and create a new organization record.
   */
  createRecord(record: Omit<OrganizationRecord, "id">): OrganizationRecord {
    if (record.firstName.trim().length < 3) {
      throw new Error("First name must be at least 3 characters long.");
    }

    const existingRoles = organizationRepository
      .getAll()
      .map((currentRecord) => currentRecord.role.toLowerCase());

    if (existingRoles.includes(record.role.toLowerCase())) {
      throw new Error("This role is already assigned.");
    }

    return organizationRepository.create(record);
  },
};
