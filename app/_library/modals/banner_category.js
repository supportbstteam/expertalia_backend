import { Schema, model, models } from "mongoose";

const BannerCategorySchema = new Schema(
  {    
    name: { 
      type: String, 
      required: [true, "Name is required"],
    },
    width: { 
      type: Number, 
      required: false,
      default: 0
    },
    height: { 
      type: Number, 
      required: false,
      default: 0
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

const BannerCategory = models.BannerCategory || model('BannerCategory', BannerCategorySchema);
export default BannerCategory;