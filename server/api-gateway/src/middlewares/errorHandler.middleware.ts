import {
  Errback,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

export const errorHandler: ErrorRequestHandler = (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Error Occured on path ${req.path}`, err);

  

};
