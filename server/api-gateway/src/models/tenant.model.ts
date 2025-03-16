import { Document, model, Schema } from "mongoose";

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
      required: true,
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
