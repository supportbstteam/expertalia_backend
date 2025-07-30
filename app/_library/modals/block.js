import { Schema, model, models } from "mongoose";

const BlockSchema = new Schema(
  {    
    name: { 
      type: String, 
      required: [true, "Name is required"],
    },
    slug: { 
      type: String, 
      required: [true, "Slug is required"],
      unique: [true, "Duplicate slug"],
    }, 
    content: { 
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

const Block = models.Block || model('Block', BlockSchema);
export default Block;