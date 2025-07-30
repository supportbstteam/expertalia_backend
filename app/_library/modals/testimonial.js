import { Schema, model, models } from "mongoose";

const TestimonialSchema = new Schema(
  {    
    name: { 
      type: String, 
      required: [true, "Name is required"],
    },
    designation: { 
      type: String, 
      required: [true, "Designation is required"],
    },
    profile_image: { 
      type: String, 
      required: false,
    },
    description: { 
      type: String, 
      required: [true, "Description is required"],
    },
    sort_order: { 
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

const Testimonial = models.User || model('Testimonial', TestimonialSchema);
export default Testimonial;