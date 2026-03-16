import { Request, Response } from "express";
import { organizationService } from "../services/organizationService";

/**
 * Controller for organization requests.
 */
export const organizationController = {
  /**
   * Handle request to get all organization records.
   */
  getAllRecords(_request: Request, response: Response): void {
    const records = organizationService.getAllRecords();
    response.status(200).json(records);
  },

  /**
   * Handle request to create a new organization record.
   */
  createRecord(request: Request, response: Response): void {
    try {
      const newRecord = organizationService.createRecord(request.body);
      response.status(201).json(newRecord);
    } catch (error) {
      response.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Unable to create organization record.",
      });
    }
  },
};
