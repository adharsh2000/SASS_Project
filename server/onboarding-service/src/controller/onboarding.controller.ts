import { NextFunction, Request, Response } from "express";

type createTenantBody = { tenantName: string };

export const createTenant = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { tenantName }: createTenantBody = req.body;

    if (!tenantName) {
      res.status(400).json({
        message: "Tenant name is required",
        success: false,
        data: null,
      });
      return;
    }

    const dbName = `SAAS_${tenantName.toUpperCase()}`;

    

    res.status(200).json({ message: "Tenant created successfully" });
  } catch (error) {
    next(error);
  }
};
