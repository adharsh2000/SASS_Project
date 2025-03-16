import { Document, model, Schema } from "mongoose";

export interface ItenantSchema extends Document {
  tenant: string;
  dbName: string;
  createdAt: Date;
  updatedAt: Date;
}

const tenantSchema = new Schema<ItenantSchema>(
  {
    tenant: String,
    dbName: String,
  },
  { timestamps: true }
);

export default tenantSchema;
