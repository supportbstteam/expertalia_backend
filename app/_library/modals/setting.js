import { Schema, model, models } from "mongoose";

const SettingSchema = new Schema(
  {    
    field_type: { 
      type: String, 
      required: [true, "Field type is required"],
    },
    name: { 
      type: String, 
      required: [true, "Name is required"],
    },
    slug: { 
      type: String, 
      required: [true, "Slug is required"],
      unique: [true, "Duplicate slug"],
    }, 
    value: { 
      type: String, 
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Setting = models.Setting || model('Setting', SettingSchema);
export default Setting;