import { prisma } from "../prisma";

/**
 * Repository for organization data access.
 */
export const organizationRepository = {
  /**
   * Get all organization records.
   */
  async getAll() {
    return prisma.role.findMany();
  },
};