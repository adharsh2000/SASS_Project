import { HttpStatusType } from "../config/http.config";

export class AppError extends Error {
  public statusCode: HttpStatusType;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
