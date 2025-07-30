import { Schema, model, models } from "mongoose";

const ServiceCategorySchema = new Schema(
  {    
    name: { 
      type: String, 
      required: [true, "Name is required"],
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

const ServiceCategory = models.ServiceCategory || model('ServiceCategory', ServiceCategorySchema);
export default ServiceCategory;