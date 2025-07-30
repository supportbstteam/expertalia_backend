import { Schema, model, models } from "mongoose";

const ServiceSchema = new Schema(
  {    
    name: { 
      type: String, 
      required: [true, "Name is required"],
    },    
    description: { 
      type: String, 
      required: false,
    },    
    category: { type: Schema.Types.ObjectId, ref: "ServiceCategory" },  
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

const Service = models.Service || model('Service', ServiceSchema);
export default Service;