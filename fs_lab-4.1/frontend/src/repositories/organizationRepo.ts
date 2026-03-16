import type { OrganizationRecord } from "../types/organization";

const ORGANIZATION_API_URL = "http://localhost:3001/api/organization";

function normalizeRole(role: string): string {
  return role.trim().toLowerCase();
}

export const organizationRepo = {
  async getAll(): Promise<OrganizationRecord[]> {
    const response = await fetch(ORGANIZATION_API_URL);

    if (!response.ok) {
      throw new Error("Unable to load organization records.");
    }

    return response.json();
  },

  async roleIsOccupied(role: string): Promise<boolean> {
    const records = await this.getAll();
    const key = normalizeRole(role);
    return records.some((record) => normalizeRole(record.role) === key);
  },

  async create(record: OrganizationRecord): Promise<OrganizationRecord> {
    const response = await fetch(ORGANIZATION_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to create organization record.");
    }

    return data;
  },

  async clear(): Promise<void> {
    return;
  },
};