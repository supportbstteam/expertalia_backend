import { Schema, model, models } from "mongoose";

const CmspageSchema = new Schema(
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
    banner_image: { 
      type: String, 
      required: false,
    },
    banner_text: { 
      type: String, 
      required: false,
    },
    content: { 
      type: String, 
      required: false,
    },
    meta_title: { 
      type: String, 
      required: false,
    },
    meta_keyword: { 
      type: String, 
      required: false,
    },
    meta_description: { 
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

const Cmspage = models.Cmspage || model('Cmspage', CmspageSchema);
export default Cmspage;