import { prisma } from "../prisma";

/**
 * Repository for employee data access.
 */
export const employeeRepository = {
  /**
   * Get all employees.
   */
  async getAll() {
    return prisma.employee.findMany({
      include: {
        role: true,
      },
    });
  },

  /**
   * Create a new employee.
   */
  async create(employee: {
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
  }) {
    return prisma.employee.create({
      data: employee,
      include: {
        role: true,
      },
    });
  },
};