import { NextFunction,Request, Response } from "express";
import { DateTime } from "luxon";

export const reqLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.info(`origin (${DateTime.now().toISO()}): ${req.get("origin")}`);

  console.info(
    `request (${DateTime.now().toISO()}): ${req.protocol}://${req.hostname}${
      req.originalUrl
    } (${req.method})`
  );
  return next();
};
