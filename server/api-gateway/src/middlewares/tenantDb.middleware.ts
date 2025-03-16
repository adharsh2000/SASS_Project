import { NextFunction, Request, Response } from "express";

type AuthRequest = Request & {
  tenant: string;
};

// Middleware: Fetch tenant DB URI
async function fetchTenantDBURI(req: any, res: any, next: any) {
  try {
    const host = req.headers?.host; // Example: "tenant1.yoursaas.com"
    const tenantArray = host?.split(".") // Extract tenant name
    if(!tenantArray) return res.status(400).json({ message: "Tenant not found" });
    if(tenantArray.length < 2) return res.status(400).json({ message: "Tenant not found" });
    const tenant = tenantArray[0];    

    if (!tenant) return res.status(400).json({ message: "Tenant not found" });

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

    req.tenant = tenant;
    // req.dbURI = dbURI; // Attach DB URI to the request
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default fetchTenantDBURI;
