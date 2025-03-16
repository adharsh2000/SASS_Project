import mongoose from "mongoose";
import { config } from "../config/config";
import tenantSchema, { ItenantSchema } from "../models/tenant.model";
import { generateTenant } from "../utils/functions";

async function seedTenant() {
  try {
    const db = mongoose.createConnection(
      `${config.MONGO_URI}/${config.SUPER_ADMIN_DB}`
    );

    db.once("open", async () => {
      console.log("Connected to MongoDB");
    });

    // Register model dynamically
    const TenantModel = db.model<ItenantSchema>("Tenant", tenantSchema);

    await db.asPromise();

    // delete all tenants
    await TenantModel.deleteMany({});

    const tenant = new TenantModel({
      tenant: generateTenant(),
      tenantName: "superadmin",
      dbName: "SAAS_SUPER_ADMIN",
    });

    await tenant.save();

    console.log(
      `Tenant seeded successfully: ${tenant.tenant} - ${tenant.dbName}`
    );
  } catch (error) {
    console.error(`Error seeding tenant: ${error}`);
  } finally {
    await mongoose.disconnect();
  }
}

seedTenant();
