import { Document, model, Schema } from "mongoose";
import { generateTenant } from "../utils/functions";

export interface ItenantSchema extends Document {
  tenant: string;
  tenantName: string;
  dbName: string;
  createdAt: Date;
  updatedAt: Date;
}

const tenantSchema = new Schema<ItenantSchema>(
  {
    tenant: {
      type: String,
      default: function () {
        return generateTenant();
      },
      unique: true,
    },
    tenantName: {
      type: String,
      required: true,
    },
    dbName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default tenantSchema;
