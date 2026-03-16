import { organizationData } from "../data/organizationData";
import { OrganizationRecord } from "../models/OrganizationRecord";

/**
 * Repository for organization data access.
 */
export const organizationRepository = {
  /**
   * Get all organization records.
   */
  getAll(): OrganizationRecord[] {
    return organizationData;
  },

  /**
   * Create a new organization record.
   */
  create(record: Omit<OrganizationRecord, "id">): OrganizationRecord {
    const newRecord: OrganizationRecord = {
      id: organizationData.length + 1,
      ...record,
    };

    organizationData.push(newRecord);
    return newRecord;
  },
};
