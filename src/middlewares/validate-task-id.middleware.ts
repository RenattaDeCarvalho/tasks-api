import { NextFunction, Request, Response } from "express";

export function validateTaskIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void | Response {
  const taskId = Number(req.params.id);

  if (!req.params.id) {
    return res.status(400).json({
      message: "Task ID is required."
    });
  }

  if (Number.isNaN(taskId) || taskId <= 0) {
    return res.status(400).json({
      message: "Task ID must be a valid number."
    });
  }

  next();
}