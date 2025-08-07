import { Schema, model, models } from "mongoose";

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    nif: {
      type: String,
      required: [true, "NIF is required"],
    },
    zipCode: {
      type: String,
      required: [true, "zipCode is required"],
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    company_logo: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: Number,
      required: false,
      default: 0
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Company = models.Company || model('Company', CompanySchema);
export default Company;