import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
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
    blogcat_id: { 
      type: String, 
      required: true,
    },  
    blog_category: { type: Schema.Types.ObjectId, ref: "BlogCategory" },  
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

const Blog = models.Blog || model('Blog', BlogSchema);
export default Blog;