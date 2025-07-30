import { Schema, model, models } from "mongoose";

const ContactSchema = new Schema(
  {    
    name: { 
      type: String, 
      required: [true, "Name is required"],
    },
    email: { 
      type: String, 
      required: [true, "Email is required"],      
    }, 
    phone: { 
      type: String, 
      required: [true, "Phone is required"],      
    }, 
    message: { 
      type: String, 
      required: [true, "Message is required"],      
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

const Contact = models.Contact || model('Contact', ContactSchema);
export default Contact;