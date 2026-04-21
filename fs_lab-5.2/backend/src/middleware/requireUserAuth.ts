import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

export function requireUserAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { userId } = getAuth(request);

  if (!userId) {
    return response.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
}