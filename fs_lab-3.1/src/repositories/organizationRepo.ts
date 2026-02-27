import type { OrganizationRecord } from "../types/organization";

let organizationStore: OrganizationRecord[] = [];

function normalizeRole(role: string): string {
  return role.trim().toLowerCase();
}

export const organizationRepo = {
  getAll(): OrganizationRecord[] {
    return structuredClone(organizationStore);
  },

  roleIsOccupied(role: string): boolean {
    const key = normalizeRole(role);
    return organizationStore.some((r) => normalizeRole(r.role) === key);
  },

  create(record: OrganizationRecord): OrganizationRecord[] {
    organizationStore = [...organizationStore, record];
    return structuredClone(organizationStore);
  },

  clear(): void {
    organizationStore = [];
  },
};