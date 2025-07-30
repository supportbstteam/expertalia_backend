import { Schema, model, models } from "mongoose";

const BlogCategorySchema = new Schema(
  {    
    name: { 
      type: String, 
      required: [true, "Please provide name"],
    },
    slug: { 
      type: String, 
      required: [true, "Slug is required"],
      unique: [true, "Duplicate slug"],
    }, 
    image: { 
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

const BlogCategory = models.BlogCategory || model("BlogCategory", BlogCategorySchema);
export default BlogCategory;
