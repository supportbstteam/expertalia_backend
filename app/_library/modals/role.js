import { Schema, model, models } from "mongoose";

const RoleSchema = new Schema(
  {   
    name: { 
      type: String, 
      required: [true, "Please provide role name"],
    }, 
    modules: { 
      type: String, 
      required: false,
    },      
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Role = models.Role || model('Role', RoleSchema);
export default Role;