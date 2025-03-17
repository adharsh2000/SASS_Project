import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "../config/config";
import TenantModel, { ItenantSchema } from "../models/tenant.model";
import tenantSchema from "../models/tenant.model";
import { AppError } from "../utils/app-error";

type AuthRequest = Request & {
  tenant: string;
};

// Middleware: Fetch tenant DB URI
async function fetchTenantDBURI(req: any, res: any, next: any) {
  try {
    let tenant = req.headers["x-tenant"];

    if (!tenant) {
      return res.status(400).json({ message: "Tenant not found" });
    }

    // const host = req.headers?.host; // Example: "tenant1.yoursaas.com"
    // const tenantArray = host?.split("."); // Extract tenant name
    // if (!tenantArray)
    //   return res.status(400).json({ message: "Tenant not found" });
    // if (tenantArray.length < 2)
    //   return res.status(400).json({ message: "Tenant not found" });
    // const tenant = tenantArray[0];

    // if (!tenant) return res.status(400).json({ message: "Tenant not found" });

    // // Check Redis cache first
    // let dbURI = await redis.get(`tenant:${tenant}`);

    // if (!dbURI) {
    //   console.log(`Fetching DB URI for ${tenant} from SuperAdmin DB...`);

    //   // Fetch from SuperAdmin database
    //   const tenantData = await Tenant.findOne({ tenant });
    //   if (!tenantData)
    //     return res.status(404).json({ message: "Tenant not found" });

    //   dbURI = tenantData.dbURI;

    //   // Store in Redis for 1 hour
    //   await redis.setex(`tenant:${tenant}`, 3600, dbURI);
    // }

    const db = mongoose.createConnection(
      `${config.MONGO_URI}/${config.SUPER_ADMIN_DB}`
    );

    // db.on("connect", () => {
    //   console.log("Connected to SuperAdmin DB");
    // });

    // Register model dynamically
    const TenantModel = db.model<ItenantSchema>("Tenant", tenantSchema);

    // async function getTenantData(tenant: string) {
    try {
      await db.asPromise();
      const tenantData = await TenantModel.findOne({ tenant });

      if (!tenantData) {
        res
          .status(404)
          .json({ success: false, message: "Tenant not found", data: null });
      } else {
        console.log("Tenant Data  from db:", tenantData);
      }
    } catch (error) {
      console.error(error);
      throw new AppError("Error occured on connecting to SuperAdmin DB", 500);
    } finally {
      await db.close();
    }
    // }

    // console.log("tenantData", tenantData);

    // if (!tenantData)
    //   return res
    //     .status(404)
    //     .json({ message: "Tenant not found in SuperAdmin DB" });

    req.tenant = tenant;
    // req.dbURI = dbURI; // Attach DB URI to the request
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export default fetchTenantDBURI;
