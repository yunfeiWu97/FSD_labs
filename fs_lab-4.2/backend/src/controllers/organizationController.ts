import { Request, Response } from "express";
import { organizationService } from "../services/organizationService";

/**
 * Controller for organization requests.
 */
export const organizationController = {
  /**
   * Handle request to get all organization records.
   */
  async getAllRecords(_request: Request, response: Response): Promise<void> {
    const records = await organizationService.getAllRecords();
    response.status(200).json(records);
  },

  /**
   * Handle request to create a new organization record.
   */
  createRecord(_request: Request, response: Response): void {
    response.status(501).json({
      message: "Create organization record is not implemented for Lab 4.2.",
    });
  },
};