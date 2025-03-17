import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";

export const errorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Error Occured on path ${req.path}`, error);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
      //   errorCode: error.errorCode,
      success: false,
      data: null,
    });
    return;
  }

  res.status(500).json({
    message: "Internal Server Error",
    // error: error?.message || "Unknow error occurred",
    success: false,
    data: null,
  });
  return;
};
