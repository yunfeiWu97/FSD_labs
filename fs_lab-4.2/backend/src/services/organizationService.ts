import { organizationRepository } from "../repositories/organizationRepository";

/**
 * Service for organization business logic.
 */
export const organizationService = {
  /**
   * Get all organization records.
   */
  async getAllRecords() {
    return organizationRepository.getAll();
  },
};