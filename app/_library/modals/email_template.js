import { Schema, model, models } from "mongoose";

const  EmailTemplateSchema = new Schema(
  {    
    name: { 
      type: String, 
      required: [true, "Name is required"],
    },
    subject: { 
      type: String, 
      required: [true, "Subject is required"],
    },
    body: { 
      type: String, 
      required: [true, "Body is required"],
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

const EmailTemplate = models.EmailTemplate || model('EmailTemplate', EmailTemplateSchema);
export default EmailTemplate;