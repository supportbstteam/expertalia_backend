import { Schema, model, models } from "mongoose";

const ModuleSchema = new Schema(
  {    
    name: { 
      type: String, 
      required: [true, "Please provide name"],
    },
    code: { 
      type: String, 
      required: [true, "Please provide code"],
      unique: [true, "Duplicate code"],
    },     
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Module = models.Module || model('Module', ModuleSchema);
export default Module;