import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import chalk from "chalk";
import type CustomError from "../../../CustomError/CustomError.js";

const debug = createDebug("isdinetwork-api:server:middleware:generalError");

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(chalk.red(error.message));

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : "Everything has explode";

  res.status(statusCode).json({ message });
};
